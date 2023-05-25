import { PrismaClient } from "@prisma/client";
import express from "express";
import router from "./routes";
import errorMiddleware from "./middleware/error-middleware";
import notFoundMiddleware from "./middleware/not-found";
import helmet from "helmet";
import xss from "xss-clean";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss());

app.use("/api/v1", router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});