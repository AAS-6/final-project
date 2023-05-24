import express from "express";

export const controller = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // TODO: Implement sign out
    res.send("Sign out");
  } catch (error) {
    next(error);
  }
};
