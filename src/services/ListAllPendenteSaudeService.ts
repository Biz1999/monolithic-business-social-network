import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";

interface IDocumentsRequest {
  start: number;
  limit: number;
}

class ListAllPendenteSaudeService {
  async execute({ start, limit }: IDocumentsRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);

    const pendentes = await saudeRepositories
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.pilarId", "pilar")
      .leftJoinAndSelect("pilar.colaboradorId", "colaborador")
      .where("pilar.status = :status", { status: "pendente" })
      .orderBy("pilar.created_at", "ASC")
      .leftJoinAndSelect("post.photos", "photos")
      .skip(start)
      .take(limit)
      // .cache(`saudePendentes:${start}_${limit}`, 3600000)
      .getMany();

    return classToPlain(pendentes);
  }
}

export { ListAllPendenteSaudeService };
