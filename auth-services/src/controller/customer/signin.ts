import bcrypt from "bcrypt";
import prisma from "../../database/config";
import express from "express";
import jwt from "jsonwebtoken";

export async function controller(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const buyer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!buyer) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, buyer.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: buyer.id,
      email: buyer.email,
      role: "buyer",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Sign in successfully",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
