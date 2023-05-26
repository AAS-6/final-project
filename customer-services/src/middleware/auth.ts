import { CustomAPIError, UnauthenticatedError } from "../error";
import { Request, Response, NextFunction } from "express";
// import { instance } from "../axios/config";
import axios from "axios";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    req.body.userid = "";

    const token = authHeader.split(" ")[1];

    axios
      .get("http://localhost:3000/api/v1/validate", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const { data } = response;

        req.body.userid = data.userid;
        req.body.role = data.role;
        next();
      })
      .catch(error => {
        const customError = new UnauthenticatedError("Authentication invalid");
        next(customError);
      });
  } catch (error) {
    next(error);
  }
};

export default auth;
