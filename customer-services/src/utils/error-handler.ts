import { BadRequestError } from "../error";
import { Prisma } from "@prisma/client";

// create error handler for prisma errors
export const prismaTryCatch = async (fn: any) => {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        throw new BadRequestError("Duplicate record");
      }
      if (e.code === "P2025") {
        throw new BadRequestError("Record not found");
      }
      throw new BadRequestError("Bad request");
    }
  }
};


