import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import { postgreDB } from "./database";

const app = express();

const bootstrap = async () => {
  await postgreDB();

  app.use(express.json());

  app.use(router);

  app.use("/cdn", express.static("../public"));

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          error: err.message,
        });
      }
      return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  );
  app.listen(3000, "0.0.0.0", () => console.log(`Server listenin...`));
};

bootstrap();
