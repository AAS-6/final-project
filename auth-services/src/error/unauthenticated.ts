import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnaunthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnaunthenticatedError;
