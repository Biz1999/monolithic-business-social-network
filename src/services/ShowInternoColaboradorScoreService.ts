import { getCustomRepository } from "typeorm";
import { InternoRepositories } from "../repositories/InternoRepositories";

interface IScoreColaboradorRequest {
  id: string;
  nome: string;
  month: number;
}

class ShowInternoColaboradorScoreService {
  async execute({ id, nome, month }: IScoreColaboradorRequest) {
    const internoRepositories = getCustomRepository(InternoRepositories);
    const score = await internoRepositories
      .createQueryBuilder("interno")
      .leftJoinAndSelect("interno.pilarId", "pilar")
      .where("pilar.colaborador_id = :id", { id })
      .andWhere("interno.nome = :nome", { nome })
      .andWhere("EXTRACT(MONTH FROM interno.created_at) = :month", {
        month: month,
      })
      .select("SUM(pilar.pontuacao)", "pontuacao_do_mes")
      .getRawOne();

    if (score.pontuacao_do_mes === null) score.pontuacao_do_mes = 0;

    return score;
  }
}

export { ShowInternoColaboradorScoreService };
