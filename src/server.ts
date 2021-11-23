"use strict";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "./postgres";
import ip from "ip";

import { router } from "./routes";
import { watchFile } from "fs";

import { postgreDB } from "./database";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import cors from "cors";
import { ExcelTableController } from "./controllers/ExcelTableController";

const app = express();

const bootstrap = async () => {
  await postgreDB();

  const https = require("https");
  const fs = require("fs");
  const path = require("path");

  const excelTableController = new ExcelTableController();
  // watchFile(
  //   "../../../SPI Integracao de Sistemas Ltda/Superar-Para-Inovar-CDN - API-Armazenamento/ranking.csv",
  //   (curr, prev) => {
  //     console.log(`the current mtime is: ${curr.mtime}`);
  //     console.log(`the previous mtime was: ${prev.mtime}`);
  //     excelTableController.handle();
  //   }
  // );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(router);
  app.use(
    "/cdn",
    //ensureAuthenticated,
    express.static(
      "../../../SPI Integracao de Sistemas Ltda/Superar-Para-Inovar-CDN - API-Armazenamento"
    )
  );
  app.use("/", express.static("public"));
  app.use("/home", express.static("public"));
  app.use("/recover", express.static("recover"));

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
  //     key: fs.readFileSync(path.join(__dirname, "../cert", "server.key")),
  //     cert: fs.readFileSync(path.join(__dirname, "../cert", "server.crt")),
  //   },
  //   app
  // );

  app.listen(8000, () => {
    console.log(`Ip ${ip.address()}-> Server listenin...`);
  });
  // sslServer.listen(443, () => {
  //   console.log(`Ip ${ip.address()}-> Server listenin...`);
  // });

  // require("greenlock-express")
  //   .init({
  //     packageRoot: __dirname,
  //     configDir: "../greenlock.d",

  //     // contact for security and critical bug notices
  //     maintainerEmail: "alessandro.biz@integradora.com.br",

  //     // whether or not to run at cloudscale
  //     cluster: false,
  //   })
  //   // Serves on 80 and 443
  //   // Get's SSL certificates magically!
  //   .serve(app);
};

bootstrap();
