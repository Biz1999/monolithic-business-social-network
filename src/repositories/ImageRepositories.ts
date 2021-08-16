import { EntityRepository, Repository } from "typeorm";
import { Image } from "../models/Image";

@EntityRepository(Image)
class ImageRepositories extends Repository<Image> {}

export { ImageRepositories };
