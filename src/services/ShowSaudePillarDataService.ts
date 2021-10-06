import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";

interface IShowSaudeRequest {
  post_id: string;
}

class ShowSaudePillarDataService {
  async execute({ post_id }: IShowSaudeRequest) {
    try {
      const saudeRepositories = getCustomRepository(SaudeRepositories);

      const photos = saudeRepositories
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.pilarId", "pilar")
        .where("post.id = :post_id", { post_id })
        .leftJoinAndSelect("post.photos", "photos")
        .getOne();

      return classToPlain(photos);
    } catch (error) {
      throw new Error();
    }
  }
}

export { ShowSaudePillarDataService };
