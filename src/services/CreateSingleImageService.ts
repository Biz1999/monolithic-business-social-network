import { getCustomRepository } from "typeorm";
import { InternoRepositories } from "../repositories/InternoRepositories";

interface IImageRequest {
  interno_id: string;
  comprovante: string;
}

class CreateSingleImageService {
  async execute({ interno_id, comprovante }: IImageRequest) {
    const internoRepositories = getCustomRepository(InternoRepositories);

    if (!interno_id) throw new Error("Necessário identificador do colaborador");

    const interno = await internoRepositories.save({
      id: interno_id,
      comprovante,
    });

    return interno;
  }
}

export { CreateSingleImageService };
