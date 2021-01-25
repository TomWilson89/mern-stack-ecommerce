import { NextFunction, Request, Response } from "express";
import HttpError from "../errors/http";
import InternalServerError from "../errors/internalServer";

async function error(
  err: Error | HttpError | HttpError[],
  req: Request,
  res: Response,
  next: NextFunction
) {
  let errors: HttpError[];

  console.log("Error Ocurred", err);
  if (err instanceof Array) errors = err;
  else if (err instanceof HttpError) errors = [err];
  else errors = [new InternalServerError()];

  const error = errors[0];

  res.status(error.status).json({
    error: {
      errors,
      code: error.status,
      message: error.message,
    },
  });
}

export default error;
