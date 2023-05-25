import express from "express";
import prisma from "../../database/config";
import jwt from "jsonwebtoken";
import { BadRequestError, UnaunthenticatedError } from "../../error";
import { Role } from "@prisma/client";

export async function controller(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  const { role } = req.body as {
    role: Role;
  };

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

    if (!role) {
        throw new BadRequestError("New Role is required, please provide new role to update. Available roles: 'BUYER', 'SELLER'"); 
    }

    // update role
    const updatedBuyer = await prisma.customer.update({
      where: {
        id: payload.id,
      },
      data: {
        role,
        updatedAt: new Date(),
      },
    });

    const newPayload = {
      id: updatedBuyer.id,
      email: updatedBuyer.email,
      role: updatedBuyer.role,
    };

    const newToken = jwt.sign(newPayload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Update success",
      error: false,
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    next(error);
  }
}
