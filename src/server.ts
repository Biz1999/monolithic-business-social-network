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

  const https = require("https");
  const fs = require("fs");
  const path = require("path");

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
  app.use("/", express.static("public"));

  app.get("*", function (req, res) {
    res
      .status(404)
      .send(
        "<div style='margin: auto;width: 100%;height:100%;text-align: center;background-color:#651D32'><h1 style='color:white'>404 NOT FOUND</h1><img src='https://static.wixstatic.com/media/a04754_ae492f92043d473d89fba314c59f9c7c~mv2.png/v1/fill/w_156,h_102,al_c,q_85,usm_0.66_1.00_0.01/Superar_Inovar_SPI_Logo_2021-04.webpg' width=100/></div>"
      );
  });

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

  // const sslServer = https.createServer(
  //   {
  //     key: fs.readFileSync(path.join(__dirname, "../cert", "key.pem")),
  //     cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem")),
  //   },
  //   app
  // );

  // sslServer.listen(8000, () => {
  //   console.log(`Ip ${ip.address()}-> Server listenin...`);
  // });
  app.listen(8000, () => {
    console.log(`Ip ${ip.address()}-> Server listenin...`);
  });
};

bootstrap();
