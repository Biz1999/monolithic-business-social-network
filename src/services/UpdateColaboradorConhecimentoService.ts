import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IUpdatePillarRequest {
  pillar_id: string;
  status: string;
  categoria: string;
  pontuacao?: number;
}

class UpdateColaboradorConhecimentoService {
  async execute({
    pillar_id,
    status,
    categoria,
    pontuacao,
  }: IUpdatePillarRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);
    if (!pillar_id)
      throw new Error("Necessário informar o identificado do pilar");
    if (status !== "aprovado" && status !== "recusado")
      throw new Error("Status não reconhecido");
    if (pontuacao === undefined || pontuacao === null || pontuacao === NaN)
      throw new Error("Pontuação necessária");
    try {
      if (
        categoria === "article" ||
        categoria === "book" ||
        categoria === "lecture"
      ) {
        const pilar = await pilarRepositories.save({
          id: pillar_id,
          status: status,
          pontuacao: pontuacao,
        });

        return classToPlain(pilar);
      }
    } catch (error) {
      throw new Error("Valores incorretos");
    }

    throw new Error("Categoria não reconhecida");
  }
}

export { UpdateColaboradorConhecimentoService };
