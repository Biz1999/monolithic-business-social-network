import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";

interface IPhotosRequest {
  start: number;
  limit: number;
  colaborador_id: string;
}

class ListAllColaboradoresPostsService {
  async execute({ start, limit, colaborador_id }: IPhotosRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);

    const photos = saudeRepositories
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.pilarId", "pilar")
      .where("pilar.colaborador_id = :id", { id: colaborador_id })
      .orderBy("pilar.created_at", "DESC")
      .leftJoinAndSelect("post.photos", "photos")
      .skip(start)
      .take(limit)
      .getMany();

    return classToPlain(photos);
  }
}

export { ListAllColaboradoresPostsService };
