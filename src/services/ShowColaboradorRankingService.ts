import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IRankingRequest {
  id: string;
  month: number;
}

class ShowColaboradorRankingService {
  async execute({ id, month }: IRankingRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    const start_date = `2021-${month}-10`;
    const end_date = `2021-${month + 1}-10`;

    const ranking = await pilarRepositories
      .createQueryBuilder("pilar")
      .groupBy("pilar.colaborador_id")
      .where(
        `'[${start_date}, ${end_date}]'::daterange @> pilar.created_at::date`
      )
      .select(["SUM(pilar.pontuacao)", "pilar.colaborador_id"])
      .orderBy("sum", "DESC")
      .cache(`${id}Ranking:all_${month}`, 3600000)
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
