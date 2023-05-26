import { BadRequestError } from "../error";
import prisma from "../database/config";
import express from "express";

const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userid, role } = req.body;

  try {
    validateInput(userid);

    if (role === "BUYER") {
      try {
        const customer = await prisma.customer.findUnique({
          where: {
            id: userid,
          },
        });

        if (!customer) {
          throw new BadRequestError("Id not found");
        }

        const merchant = prisma.merchant.create({
          data: {
            id: userid,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
          },
        });

        const deleteCustomer = prisma.customer.delete({
          where: {
            id: userid,
          },
        });

        await prisma.$transaction([deleteCustomer, merchant]);

        res.status(201).json({
          success: true,
          data: merchant,
        });
      } catch (error: any) {
        if (error.code === "P2025") {
          const error = new BadRequestError("Id not found");
          next(error);
        } else if (error.code === "P2002") {
          const error = new BadRequestError("Duplicate id");
          next(error);
        } else {
          next(error);
        }
      }
    } else {
      try {
        const merchant = await prisma.merchant.findUnique({
          where: {
            id: userid,
          },
        });


        if (!merchant) {
          throw new BadRequestError("Id not found");
        }

        const customer = prisma.customer.create({
          data: {
            id: userid,
            firstName: merchant?.firstName,
            lastName: merchant?.lastName,
          },
        });

        const deleteMerchant = prisma.merchant.delete({
          where: {
            id: userid,
          },
        });

        await prisma.$transaction([deleteMerchant, customer]);

        res.status(201).json({
          success: true,
          data: customer,
        });
      } catch (error: any) {
        if (error.code === "P2025") {
          const error = new BadRequestError("Id not found");
          next(error);
        } else if (error.code === "P2002") {
          const error = new BadRequestError("Duplicate id");
          next(error);
        } else {
          next(error);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const validateInput = (userid: string) => {
  if (!userid) {
    throw new BadRequestError("Authorization header is required");
  }
};

export default controller;
