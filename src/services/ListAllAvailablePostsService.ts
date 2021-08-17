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

    let feed: Saude[];

    feed = await saudeRepositories.find({
      where: {
        isAvailable: true,
      },
      relations: ["pilarId", "pilarId.colaboradorId"],
      order: {
        created_at: "DESC",
      },
      skip: start,
      take: limit,
    });

    return classToPlain(feed);
  }
}

export { ListAllAvailablePostsService };
