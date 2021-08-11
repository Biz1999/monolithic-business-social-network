import { getCustomRepository } from "typeorm";
import { ImageRepositories } from "../repositories/ImageRepositories";
import multer from "multer";

interface Image {
  base64: string;
}

interface IImageRequest {
  post_id: string;
  images: Image[];
}

class CreateImageService {
  async execute({ post_id, images }: IImageRequest) {
    const imageRepositories = getCustomRepository(ImageRepositories);
    const upload = multer({ dest: "../../public" });
  }
}
