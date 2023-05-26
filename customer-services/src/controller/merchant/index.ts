import express from "express";
import prisma from "../../database/config";
import { Profile } from "@prisma/client";
import { BadRequestError, CustomAPIError } from "../../error";
import { HttpStatusCode } from "axios";

export const createProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      role,
      profile,
    }: { userid: string; role: string; profile: Profile } = req.body;

    console.log(userid, role, profile);
    if (role !== "SELLER") {
      throw new CustomAPIError(
        "This endpoint is only for seller",
        HttpStatusCode.Forbidden
      );
    }

    validateInput(userid, profile);

    const merchant = await prisma.merchant.update({
      where: {
        id: userid,
      },
      data: {
        profile: {
          create: {
            ...profile,
          },
        },
      },
    });

    res.status(201).json({
      message: "Profile created successfully",
      data: merchant,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { merchantId }: any = req.query;

    console.log(merchantId);

    const profile = await prisma.merchant.findUnique({
      where: {
        id: merchantId,
      },
      select: {
        profile: true,
      },
    });

    res.status(200).json({
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      userid,
      profile,
      role,
    }: { userid: string; profile: Profile; role: string } = req.body;

    if (role !== "SELLER") {
      throw new CustomAPIError(
        "This endpoint is only for seller",
        HttpStatusCode.Forbidden
      );
    }

    const updatedProfile = await prisma.merchant.update({
      where: {
        id: userid,
      },
      data: {
        profile: {
          update: {
            ...profile,
          },
        },
      },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { userid, role }: { userid: string; role: string } = req.body;

    if (role !== "SELLER") {
      throw new CustomAPIError(
        "This endpoint is only for seller",
        HttpStatusCode.Forbidden
      );
    }

    const deletedProfile = await prisma.merchant.update({
      where: {
        id: userid,
      },
      data: {
        profile: {
          delete: true,
          disconnect: true,
        },
      },
    });

    res.status(200).json({
      message: "Profile deleted successfully",
      data: deletedProfile,
    });
  } catch (error) {
    next(error);
  }
};

const validateInput = (userid: string, profile: Profile) => {
  if (!userid) {
    throw new BadRequestError("Id is required");
  }

  if (!profile) {
    throw new BadRequestError("Profile is required");
  }

  if (!profile.merchantName) {
    throw new BadRequestError("merchantName is required");
  }

  if (!profile.bio) {
    throw new BadRequestError("bio is required");
  }
};
