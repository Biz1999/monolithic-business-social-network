import { classToPlain } from "class-transformer";
import { getConnection, getCustomRepository } from "typeorm";
import { Pilar } from "../models/Pilar";
import { GroundRepositories } from "../repositories/GroundRepositories";
import { PilarRepositories } from "../repositories/PilarRepositories";
import { redisCleanCache } from "../utils/redisCleanCache";

interface IUpdatePillarRequest {
  pillar_id: string;
  status: string;
  categoria: string;
  pontuacao?: number;
  colaborador_id: string;
  justificativa?: string;
}

class UpdateColaboradorConhecimentoService {
  async execute({
    pillar_id,
    status,
    categoria,
    pontuacao,
    colaborador_id,
    justificativa,
  }: IUpdatePillarRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);
    const groundRepositories = getCustomRepository(GroundRepositories);

    if (!pillar_id)
      throw new Error("Necessário informar o identificado do pilar");
    if (status !== "aprovado" && status !== "recusado")
      throw new Error("Status não reconhecido");
    if (status === "recusado" && !justificativa)
      throw new Error("Justificativa não informada");
    if (pontuacao === undefined || pontuacao === null || pontuacao === NaN)
      throw new Error("Pontuação necessária");
    try {
      if (
        categoria === "article" ||
        categoria === "book" ||
        categoria === "lecture"
      ) {
        redisCleanCache("rankingScore");
        redisCleanCache("conhecimentoPendentes");

        const updated = await pilarRepositories
          .createQueryBuilder()
          .update<Pilar>(Pilar, {
            status: status,
            pontuacao: status === "recusado" ? 0 : pontuacao,
          })
          .where("id = :id", { id: pillar_id })
          .returning([
            "id",
            "colaborador_id",
            "pontuacao",
            "status",
            "updated_at",
          ])
          .updateEntity(true)
          .execute();

        const pilar: Pilar = updated.raw[0];

        redisCleanCache(`${pilar.colaborador_id}Documents`);
        redisCleanCache(`${pilar.colaborador_id}Ranking`);
        redisCleanCache(`${pilar.colaborador_id}Conhecimento`);

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
    } catch (error) {
      throw new Error("Valores incorretos");
    }

    throw new Error("Categoria não reconhecida");
  }
}

export { UpdateColaboradorConhecimentoService };
