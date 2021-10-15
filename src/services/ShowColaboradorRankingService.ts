import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IRankingRequest {
  id: string;
  month: number;
}

class ShowColaboradorRankingService {
  async execute({ id, month }: IRankingRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    const ranking = await pilarRepositories
      .createQueryBuilder("pilar")
      .groupBy("pilar.colaborador_id")
      .where("EXTRACT(MONTH FROM pilar.created_at) = :month", {
        month,
      })
      .select(["SUM(pilar.pontuacao)", "pilar.colaborador_id"])
      .orderBy("sum", "DESC")
      .getRawMany();

    const rankingPosition = ranking.findIndex(
      (i) => i.pilar_colaborador_id === id
    );
    if (rankingPosition === -1)
      return {
        pos: ranking.length + 1,
        pontuacao_do_mes: 0,
      };

    return {
      pos: rankingPosition + 1,
      pontuacao_do_mes: ranking[rankingPosition].sum,
    };
  }
}

export { ShowColaboradorRankingService };
