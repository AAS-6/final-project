import express from "express";
import prisma from "../../database/config";
import { Address } from "@prisma/client";
import { CustomAPIError } from "../../error";
import { HttpStatusCode } from "axios";

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
      throw new CustomAPIError(
        "Only buyer can create address in this endpoint",
        HttpStatusCode.Forbidden
      );
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
      throw new CustomAPIError(
        "Only buyer can update address in this endpoint",
        HttpStatusCode.Forbidden
      );
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
    const { userid, role }: { userid: string; role: string } = req.body;

    if (role !== "BUYER") {
      throw new CustomAPIError(
        "Only buyer can delete address in this endpoint",
        HttpStatusCode.Forbidden
      );
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

export const createRating = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      rating,
      merchantId,
      role,
    }: { userid: string; rating: number; role: string; merchantId: string } =
      req.body;

    if (role !== "BUYER") {
      throw new CustomAPIError(
        "Only buyer can create rating in this endpoint",
        HttpStatusCode.Forbidden
      );
    }

    if (!rating || !merchantId) {
      throw new Error("Rating and merchantId are required");
    }

    const newCustomerRating = await prisma.customer.update({
      where: {
        id: userid,
      },
      data: {
        Rating: {
          create: {
            id: merchantId + userid,
            rating: rating,
            merchant: {
              connect: {
                id: merchantId,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      message: "Success create rating",
      data: newCustomerRating,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRating = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      rating,
      merchantId,
      role,
    }: { userid: string; rating: number; role: string; merchantId: string } =
      req.body;

    if (role !== "BUYER") {
      throw new CustomAPIError(
        "Only buyer can update rating in this endpoint",
        HttpStatusCode.Forbidden
      );
    }

    if (!rating || !merchantId) {
      throw new Error("Rating and merchantId are required");
    }

    const updatedCustomerRating = await prisma.customer.update({
      where: {
        id: userid,
      },
      data: {
        Rating: {
          update: {
            where: {
              id: merchantId + userid,
            },
            data: {
              rating: rating,
            },
          },
        },
      },
    });

    res.status(200).json({
      message: "Success update rating",
      data: updatedCustomerRating,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRating = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      merchantId,
      role,
    }: { userid: string; role: string; merchantId: string } = req.body;

    if (role !== "BUYER") {
      throw new CustomAPIError(
        "Only buyer can delete rating in this endpoint",
        HttpStatusCode.Forbidden
      );
    }

    if (!merchantId) {
      throw new Error("MerchantId are required");
    }

    const deletedCustomerRating = prisma.customer.update({
      where: {
        id: userid,
      },
      data: {
        Rating: {
          disconnect: {
            id: merchantId + userid,
          },
        },
      },
    });

    const deletedRating = prisma.rating.delete({
      where: {
        id: merchantId + userid,
      },
    });

    await prisma.$transaction([deletedCustomerRating, deletedRating]);

    res.status(200).json({
      message: "Success delete rating",
      data: deletedCustomerRating,
    });
  } catch (error) {
    next(error);
  }
};

export const getRating = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { userid }: { userid: string } = req.body;

    const customerRating = await prisma.customer.findUnique({
      where: {
        id: userid,
      },
      select: {
        Rating: true,
      },
    });

    res.status(200).json({
      message: "Success get rating",
      data: customerRating,
    });

    res.status(200).json({
      message: "Success get rating",
      data: customerRating,
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
