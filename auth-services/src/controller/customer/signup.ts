import prisma from "../../database/config";
import express from "express";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../../error";

export const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let { email, password, role, firstName, lastName } = req.body as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      role: Role;
    };

    if (!email) {
      throw new BadRequestError("Email is required");
    }

    if (!password) {
      throw new BadRequestError("Password is required");
    }

    if (!role) {
      role = "BUYER";
    }

    if (!firstName || !lastName) {
      throw new BadRequestError("First name and last name are required");
    }

    if (password.length < 6) {
      throw new BadRequestError("Password must have at least 6 characters");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      // const response = await fetch("http://localhost:3000/api/v1/
      
      const buyer = await prisma.customer.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });

      const payload = {
        id: buyer.id,
        email: buyer.email,
        role: buyer.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "Sign up successfully",
        data: {
          token,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new BadRequestError("Email already exists");
      }
    }
  } catch (error) {
    next(error);
  }
};
