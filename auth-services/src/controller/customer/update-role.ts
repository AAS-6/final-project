import express from "express";
import prisma from "../../database/config";
import jwt from "jsonwebtoken";
import { BadRequestError, UnaunthenticatedError } from "../../error";
import { Role } from "@prisma/client";
import axios from "axios";

export async function controller(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  let role: Role | undefined;

  try {
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

    // update role
    await axios
      .put(
        "http://localhost:3001/api/v1/update-role",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async response => {
        const { data } = response;
        console.log(data);

        if (data) {
          console.log(data);
          const updatedBuyer = await prisma.customer.update({
            where: {
              id: payload.id,
            },
            data: {
              role: buyer.role === Role.BUYER ? Role.SELLER : Role.BUYER,
              updatedAt: new Date(),
            },
          });

          const newPayload = {
            id: updatedBuyer.id,
            email: updatedBuyer.email,
            role: updatedBuyer.role,
          };

          const newToken = jwt.sign(
            newPayload,
            process.env.JWT_SECRET as string,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json({
            message: "Update success",
            error: false,
            data: {
              newToken,
            },
          });
        }
      })
      .catch(error => {
        const newError = new BadRequestError(error.response.data.msg);
        throw newError;
      });
  } catch (error) {
    next(error);
  }
}
