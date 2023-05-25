import express from "express";
import router from "./router";
import helmet from "helmet";
import xss from "xss-clean";
import errorMiddleware from "./middleware/error-middleware";
import notFoundMiddleware from "./middleware/not-found";
import auth from "./middleware/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss());

app.use(
  "/api/v1",
  (req, res, next) => {
    console.log("Hello world");
    next();
  },
  auth,
  router
);

// app.use("/api/v1", router);
app.use("/", auth, (req, res) => {
  res.send("Welcome to customer services");
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
