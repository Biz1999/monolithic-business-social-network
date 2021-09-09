import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { SaudeRepositories } from "../repositories/SaudeRepositories";
import { spsave } from "spsave";

interface ISharepointRequest {
  colaborador_id: string;
  post_id: string;
  filename: string;
  path: string;
  now: number;
}

class CreateSPimageService {
  async execute({
    colaborador_id,
    post_id,
    filename,
    path,
    now,
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

      let creds = {
        username: process.env.SP_USER,
        password: process.env.SP_PASSWORD,
      };
      let fileOpts = {
        folder: `colaboradores/${colaborador.nome}-${post.legenda}-${now}`,
        fileName: filename,
        fileContent: fs.readFileSync(path),
      };

      let coreOpts = {
        siteUrl:
          "https://spiintegradora.sharepoint.com/sites/Superar-Para-Inovar-CDN",
      };

      await spsave(coreOpts, creds, fileOpts).catch(function (err) {
        throw new Error("Não foi possível realizar o upload");
      });
    } catch (error) {
      throw new Error("Não foi possível realizar o upload");
    }
  }
}

export { CreateSPimageService };
