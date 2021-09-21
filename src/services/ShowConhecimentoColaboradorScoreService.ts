import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";

interface IScoreConhecimentoRequest {
  id: string;
  month: number;
}

class ShowConhecimentoColaboradorScoreService {
  async execute({ id, month }: IScoreConhecimentoRequest) {
    const conhecimentoRepositories = getCustomRepository(
      ConhecimentoRepositories
    );
    const score = await conhecimentoRepositories
      .createQueryBuilder("conhecimento")
      .leftJoinAndSelect("conhecimento.pilarId", "pilar")
      .where("pilar.colaborador_id = :id", { id: id })
      .andWhere("EXTRACT(MONTH FROM conhecimento.created_at) = :month", {
        month: month,
      })
      .select("SUM(pilar.pontuacao)", "pontuacao_do_mes")
      .getRawOne();

    if (score.pontuacao_do_mes === null) score.pontuacao_do_mes = 0;
    return score;
  }
}

export { ShowConhecimentoColaboradorScoreService };
