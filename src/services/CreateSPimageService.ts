import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { SaudeRepositories } from "../repositories/SaudeRepositories";
import { spsave } from "spsave";

interface ISharepointRequest {
  colaborador_id: string;
  post_id: string;
  filename: string;
  path: string;
}

class CreateSPimageService {
  async execute({
    colaborador_id,
    post_id,
    filename,
    path,
  }: ISharepointRequest) {
    try {
      const saudeRepositories = getCustomRepository(SaudeRepositories);
      const colaboradorRepositories = getCustomRepository(
        ColaboradorRepositories
      );
      const fs = require("fs");

      const post = await saudeRepositories.findOne({ id: post_id });
      const colaborador = await colaboradorRepositories.findOne({
        id: colaborador_id,
      });

      if (!post || !colaborador) throw new Error("Cliente/Post não existe");

      var creds = {
        username: process.env.SP_USER,
        password: process.env.SP_PASSWORD,
      };
      var fileOpts = {
        folder: `colaboradores/123/321`,
        fileName: filename,
        fileContent: fs.readFileSync(path),
      };

      var coreOpts = {
        siteUrl:
          "https://spiintegradora.sharepoint.com/sites/Superar-Para-Inovar-CDN",
      };

      await spsave(coreOpts, creds, fileOpts)
        .then(function (data) {
          console.log("File uploaded!");
        })
        .catch(function (err) {
          console.log("Error occurred");
        });
    } catch (error) {
      console.log("Error occurred");
    }
  }
}

export { CreateSPimageService };
