import { CustomAPIError, UnauthenticatedError } from "../error";
import { Request, Response, NextFunction } from "express";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // check header
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const token = authHeader.split(" ")[1];

    const response = await fetch("http://localhost:3000/api/v1/validate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const data = await response.json();
    if (!data.error) {
      console.log(data);
      req.body.id = data.userid;
      next();
    } else {
      throw new CustomAPIError("Something went wrong", 500);
    }
  } catch (error) {
    next(error);
  }
};

export default auth;
