import { Request, NextFunction, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err)
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  res.status(400).send({
    errors: [
      {
        message: "something went wrong",
      },
    ],
  });
};
