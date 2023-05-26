import express from "express";
import prisma from "../../database/config";
import { Address } from "@prisma/client";

export const createAddress = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      address,
      role,
    }: { userid: string; address: Address; role: string } = req.body;
    validateAddress(address);

    if (role !== "BUYER") {
      throw new Error("Only buyer can create address in this endpoint");
    }

    const newCustomerAddress = await prisma.customer.update({
      where: {
        id: userid,
      },
      data: {
        address: {
          create: {
            province: address.province,
            district: address.district,
            city: address.city,
            village: address.village,
            zip: address.zip,
            detail: address.detail,
            country: address.country,
          },
        },
      },
    });

    res.status(200).json({
      message: "Success create address",
      data: newCustomerAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      address,
      role,
    }: { userid: string; address: Address; role: string } = req.body;

    if (role !== "BUYER") {
      throw new Error("Only buyer can update address in this endpoint");
    }

    const updatedCustomerAddress = await prisma.customer.update({
      where: {
        id: userid,
      },
      data: {
        address: {
          update: {
            province: address.province,
            district: address.district,
            city: address.city,
            village: address.village,
            zip: address.zip,
            detail: address.detail,
            country: address.country,
          },
        },
      },
    });

    res.status(200).json({
      message: "Success update address",
      data: updatedCustomerAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      role,
    }: { userid: string; role: string } = req.body;

    if (role !== "BUYER") {
      throw new Error("Only buyer can delete address in this endpoint");
    }

    const deletedCustomerAddress = await prisma.customer.update({
      where: {
        id: userid,
      },
      data: {
        address: {
          delete: true,
          disconnect: true,
        },
      },
    });

    res.status(200).json({
      message: "Success delete address",
      data: deletedCustomerAddress,
    });
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { userid }: { userid: string } = req.body;

    const customerAddress = await prisma.customer.findUnique({
      where: {
        id: userid,
      },
      select: {
        address: true,
      },
    });

    res.status(200).json({
      message: "Success get address",
      data: customerAddress,
    });
  } catch (error) {
    next(error);
  }
};

const validateAddress = (address: Address) => {
  if (!address) {
    throw new Error("Address are required");
  }

  if (!address.province) {
    throw new Error("Province are required");
  }

  if (!address.district) {
    throw new Error("District are required");
  }

  if (!address.city) {
    throw new Error("City are required");
  }

  if (!address.village) {
    throw new Error("Village are required");
  }

  if (!address.zip) {
    throw new Error("Zip are required");
  }
};  
