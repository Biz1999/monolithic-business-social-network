import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import ip from "ip";

import { router } from "./routes";

import { postgreDB } from "./database";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import cors from "cors";

const app = express();

const bootstrap = async () => {
  await postgreDB();

  app.use(cors());
  app.use(express.json());

  app.use(router);
  app.use(
    "/cdn",
    //ensureAuthenticated,
    express.static(
      "../../../SPI Integracao de Sistemas Ltda/Superar-Para-Inovar-CDN - API-Armazenamento"
    )
  );

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
  app.listen(8000, ip.address(), () =>
    console.log(`Port ${ip.address()}-> Server listenin...`)
  );
};

bootstrap();
