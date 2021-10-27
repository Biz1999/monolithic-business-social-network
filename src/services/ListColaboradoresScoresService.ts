import { classToClass, classToPlain } from "class-transformer";
import { format } from "date-fns";
import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IScoresRequest {
  start: number;
  limit: number;
  month: number;
}

class ListColaboradoresScoresService {
  async execute({ start, limit, month }: IScoresRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    const start_date = `2021-${month}-10`;
    const end_date = `2021-${month + 1}-10`;

    const scores = await pilarRepositories
      .createQueryBuilder("pilares")
      .select("SUM(pilares.pontuacao)", "pontuacao_do_mes")
      .leftJoinAndSelect("pilares.colaboradorId", "colaborador")
      .groupBy("colaborador.id")
      .orderBy("pontuacao_do_mes", "DESC")
      .where(
        `'[${start_date}, ${end_date}]'::daterange @> pilares.created_at::date`
      )
      .cache(`rankingScore:${start}_${limit}`, 3600000)
      .offset(start)
      .limit(limit)
      .getRawMany();

    return scores;
  }
}

export { ListColaboradoresScoresService };
