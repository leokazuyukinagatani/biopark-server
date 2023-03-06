import "dotenv/config";
import "express-async-errors";
import { Request, Response, NextFunction } from "express";
import * as express from 'express'
import * as cors from "cors";
import { routes } from "./routes";
import { AppError } from "./utils/AppError";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (
    error: AppError | ZodError | PrismaClientKnownRequestError ,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }else if(error instanceof ZodError){
      return response.status(500).json({
        status: 'error',
        message: error.errors
      })
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export { app };