import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";

interface IDocumentsRequest {
  start: number;
  limit: number;
}

class ListAllPendenteConhecimentoService {
  async execute({ start, limit }: IDocumentsRequest) {
    const conhecimentoRepositories = getCustomRepository(
      ConhecimentoRepositories
    );

    const pendentes = await conhecimentoRepositories
      .createQueryBuilder("conhecimento")
      .leftJoinAndSelect("conhecimento.pilarId", "pilar")
      .leftJoinAndSelect("pilar.colaboradorId", "colaborador")
      .where("pilar.status = :status", { status: "pendente" })
      .orderBy("pilar.created_at", "ASC")
      .leftJoinAndSelect("conhecimento.files", "files")
      .skip(start)
      .take(limit)
      .cache(`conhecimentoPendentes:${start}_${limit}`, 3600000)
      .getMany();

    return classToPlain(pendentes);
  }
}

export { ListAllPendenteConhecimentoService };
