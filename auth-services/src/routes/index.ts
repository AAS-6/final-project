import express from "express";
import buyerRoute from "./buyer-route";
import merchantRoute from "./merchant-route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/customer",
    route: buyerRoute,
  },
  {
    path: "/merchant",
    route: merchantRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
