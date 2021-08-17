import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ImageRepositories } from "../repositories/ImageRepositories";

interface IPhotosRequest {
  start: number;
  limit: number;
  colaborador_id: string;
}

class ListAllColaboradoresPostsService {
  async execute({ start, limit, colaborador_id }: IPhotosRequest) {
    const imageRepositories = getCustomRepository(ImageRepositories);

    const photos = await imageRepositories.find({
      where: {
        postId: {
          pilarId: {
            colaborador_id: colaborador_id,
          },
        },
      },
      relations: ["postId", "postId.pilarId"],
      order: {
        created_at: "DESC",
      },
      skip: start,
      take: limit,
    });

    return classToPlain(photos);
  }
}

export { ListAllColaboradoresPostsService };
