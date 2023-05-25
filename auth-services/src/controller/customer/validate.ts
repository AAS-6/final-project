import { UnaunthenticatedError } from "../../error";
import * as express from "express";
import jwt from "jsonwebtoken";
import prisma from "../../database/config";

export async function controller(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnaunthenticatedError("No auth header");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnaunthenticatedError("No token");
  }

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const buyer = await prisma.customer.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!buyer) {
      throw new UnaunthenticatedError("Invalid token");
    }

    res.status(200).json({
      message: "Validation success",
      error: false,
      userid: payload.id,
      role: payload.role,
    });
  } catch (error) {
    next(error);
  }
}
