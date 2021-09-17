import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";

interface IScoreSaudeRequest {
  id: string;
  month: number;
}

class ShowSaudeColaboradorScoreService {
  async execute({ id, month }: IScoreSaudeRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);
    const score = await saudeRepositories
      .createQueryBuilder("saude")
      .leftJoinAndSelect("saude.pilarId", "pilar")
      .where("pilar.colaborador_id = :id", { id: id })
      .andWhere("EXTRACT(MONTH FROM saude.created_at) = :month", {
        month: month,
      })
      .select("SUM(pilar.pontuacao)", "pontuacao_do_mes")
      .getRawOne();

    return score;
  }
}

export { ShowSaudeColaboradorScoreService };
