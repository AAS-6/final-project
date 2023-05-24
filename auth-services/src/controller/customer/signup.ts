import prisma from "../../database/config";
import express from "express";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let { email, password, role } = req.body as {
      email: string;
      password: string;
      role: Role;
    };

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    if (!role) {
      role = "BUYER";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const buyer = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(200).json(buyer);
  } catch (error) {
    next(error);
  }
};
