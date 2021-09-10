import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";
import { spsave } from "spsave";

interface ISharepointRequest {
  colaborador_id: string;
  conhecimento_id?: string;
  filename: string;
  path: string;
  now: number;
}

class CreateSPDocumentService {
  async execute({
    colaborador_id,
    conhecimento_id,
    filename,
    path,
    now,
  }: ISharepointRequest) {
    try {
      const conhecimentoRepositories = getCustomRepository(
        ConhecimentoRepositories
      );
      const colaboradorRepositories = getCustomRepository(
        ColaboradorRepositories
      );
      const fs = require("fs");

      const conhecimento = await conhecimentoRepositories.findOne({
        id: conhecimento_id,
      });
      const colaborador = await colaboradorRepositories.findOne({
        id: colaborador_id,
      });

      if (!conhecimento || !colaborador)
        throw new Error("Cliente/Post não existe");

      var creds = {
        username: process.env.SP_USER,
        password: process.env.SP_PASSWORD,
      };
      var fileOpts = {
        folder: `colaboradores/${colaborador.nome}-${conhecimento.titulo}-${now}`,
        fileName: filename,
        fileContent: fs.readFileSync(path),
      };

      var coreOpts = {
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

export { CreateSPDocumentService };
