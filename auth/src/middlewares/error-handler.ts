import { Request, NextFunction, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({
      errors: err.serializeError(),
    });
  }

  res.status(400).send({
    errors: [
      {
        message: "something went wrong",
      },
    ],
  });
};
