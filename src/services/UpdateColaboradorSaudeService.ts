import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { GroundRepositories } from "../repositories/GroundRepositories";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IUpdatePillarRequest {
  pillar_id: string;
  status: string;
  categoria: string;
  justificativa?: string;
  colaborador_id: string;
}

class UpdateColaboradorSaudeService {
  async execute({
    pillar_id,
    status,
    categoria,
    justificativa,
    colaborador_id,
  }: IUpdatePillarRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);
    const groundRepositories = getCustomRepository(GroundRepositories);

    if (!pillar_id)
      throw new Error("Necessário informar o identificado do pilar");
    if (status !== "aprovado" && status !== "recusado")
      throw new Error("Status não reconhecido");
    if (status === "recusado" && !justificativa)
      throw new Error("Justificativa não informada");

    if (categoria !== "alimentacao" && categoria !== "exercise")
      throw new Error("Categoria não reconhecida");

    const pilar = await pilarRepositories.save({
      id: pillar_id,
      status: status,
      pontuacao: status === "recusado" ? 0 : categoria === "exercise" ? 2 : 1,
    });

    if (status === "recusado") {
      const ground = groundRepositories.create({
        pilar_id: pillar_id,
        colaborador_id: colaborador_id,
        descricao: justificativa,
      });
      await groundRepositories.save(ground);
    }

    return classToPlain(pilar);
  }
}

export { UpdateColaboradorSaudeService };
