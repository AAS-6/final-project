import express from "express";
import bcrypt from "bcrypt";
import prisma from "../../database/config";
import jwt from "jsonwebtoken";
import { BadRequestError, UnaunthenticatedError } from "../../error";

export const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    let { email, password } = req.body as {
      password: string;
      email: string;
    };

    if (!email && !password) {
      throw new BadRequestError(
        "Update credentials failed, please provide email or password to update"
      );
    }

    if (!authHeader) {
      throw new UnaunthenticatedError("No auth header");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new UnaunthenticatedError("No token");
    }

    const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const buyer = await prisma.customer.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!buyer) {
      throw new UnaunthenticatedError("Invalid token");
    }

    if (!password && password.length < 6) {
      throw new BadRequestError("Password must have at least 6 characters");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (email === buyer.email) {
      throw new Error("Email is same as before");
    }

    if (!email && password) {
      email = buyer.email;
    }

    if (!password && email) {
      password = buyer.password;
    }


    const updatedBuyer = await prisma.customer.update({
      where: {
        id: payload.id,
      },
      data: {
        email,
        password: hashedPassword,
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

    res.cookie("token", newToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Update successfully",
      data: {
        token: newToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
