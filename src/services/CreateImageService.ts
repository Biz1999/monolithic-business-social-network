import { getCustomRepository } from "typeorm";
import { ImageRepositories } from "../repositories/ImageRepositories";

interface IImageRequest {
  post_id: string;
  uri: string;
}

class CreateImageService {
  async execute({ post_id, uri }: IImageRequest) {
    const imageRepositories = getCustomRepository(ImageRepositories);

    const newImage = imageRepositories.create({
      post_id,
      uri,
    });

    try {
      await imageRepositories.save(newImage);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export { CreateImageService };
