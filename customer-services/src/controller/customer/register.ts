import prisma from "../../database/config";
import express from "express";

const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userid, firstName, lastName } = req.body;

  try {

    const customer = await prisma.customer.create({
      data: {
        id: userid,
        firstName,
        lastName,
      },
    });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

export default controller;
