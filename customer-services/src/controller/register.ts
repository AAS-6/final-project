import express from "express";
import prisma from "../database/config";
import { BadRequestError } from "../error";
import e from "express";

const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { firstName, lastName, role } = req.body;

  try {
    if (!firstName || !lastName) {
      throw new BadRequestError("First name and last name are required");
    }

    if (role === "BUYER") {
      const customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
        },
      });

      res.status(201).json({
        success: true,
        data: customer,
      });
    }

    if (role === "SELLER") {
      const merchant = await prisma.merchant.create({
        data: {
          firstName,
          lastName,
        },
      });

      res.status(201).json({
        success: true,
        data: merchant,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default controller;
