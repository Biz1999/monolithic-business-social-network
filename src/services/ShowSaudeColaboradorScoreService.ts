import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";

interface IScoreSaudeRequest {
  id: string;
  month: number;
}

class ShowSaudeColaboradorScoreService {
  async execute({ id, month }: IScoreSaudeRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);

    const start_date = `2021-${month}-10`;
    const end_date = `2021-${month + 1}-10`;

    const score = await saudeRepositories
      .createQueryBuilder("saude")
      .leftJoinAndSelect("saude.pilarId", "pilar")
      .where("pilar.colaborador_id = :id", { id: id })
      .andWhere(
        `'[${start_date}, ${end_date}]'::daterange @> pilar.created_at::date`
      )
      .cache(`${id}Saude:${month}`, 3600000)
      .select("SUM(pilar.pontuacao)", "pontuacao_do_mes")
      .getRawOne();

    if (score.pontuacao_do_mes === null) score.pontuacao_do_mes = 0;

    return score;
  }
}

export { ShowSaudeColaboradorScoreService };
