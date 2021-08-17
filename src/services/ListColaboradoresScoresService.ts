import { classToPlain } from "class-transformer";
import { createQueryBuilder, getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IScoresRequest {
  start: number;
  limit: number;
  month: number;
}

class ListColaboradoresScoresService {
  async execute({ start, limit, month }: IScoresRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    const scores = await pilarRepositories
      .createQueryBuilder("pilares")
      .select("SUM(pilares.pontuacao)", "pontuacao_do_mes")
      .leftJoinAndSelect("pilares.colaboradorId", "colaborador")
      .groupBy("colaborador.id")
      .orderBy("pontuacao_do_mes", "DESC")
      .where("EXTRACT(MONTH FROM pilares.created_at) = :month", {
        month: month,
      })
      .offset(start)
      .limit(limit)
      .getRawMany();

    return scores;
  }
}

export { ListColaboradoresScoresService };
