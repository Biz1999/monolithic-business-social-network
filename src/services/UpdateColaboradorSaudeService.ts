import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IUpdatePillarRequest {
  pillar_id: string;
  status: string;
  categoria: string;
}

class UpdateColaboradorSaudeService {
  async execute({ pillar_id, status, categoria }: IUpdatePillarRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    if (!pillar_id)
      throw new Error("Necessário informar o identificado do pilar");
    if (status !== "aprovado" && status !== "recusado")
      throw new Error("Status não reconhecido");

    if (categoria !== "alimentacao" && categoria !== "exercise")
      throw new Error("Categoria não reconhecida");

    const pilar = await pilarRepositories.save({
      id: pillar_id,
      status: status,
      pontuacao: categoria === "exercise" ? 2 : 1,
    });
    return classToPlain(pilar);
  }
}

export { UpdateColaboradorSaudeService };
