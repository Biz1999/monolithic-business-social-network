import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";
import { classToPlain } from "class-transformer";
import { Saude } from "../models/Saude";

interface IFeedRequest {
  start: number;
  limit: number;
}

class ListAllAvailablePostsService {
  async execute({ start, limit }: IFeedRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);

    const feed = await saudeRepositories
      .createQueryBuilder("saude")
      .where("saude.isAvailable = 'true'")
      .leftJoinAndSelect("saude.pilarId", "pilar")
      .leftJoinAndSelect("pilar.colaboradorId", "colaborador")
      .andWhere("pilar.status = 'aprovado'")
      .leftJoinAndSelect("saude.photos", "photosss")
      .orderBy("pilar.created_at", "DESC")
      .skip(start)
      .take(limit)
      .getMany();

    return classToPlain(feed);
  }
}

export { ListAllAvailablePostsService };
