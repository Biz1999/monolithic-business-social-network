import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IPilarRequest {
  colaborador_id: string;
}

class CreatePilarService {
  async execute({ colaborador_id }: IPilarRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    const pilar = pilarRepositories.create({
      colaborador_id,
    });

    await pilarRepositories.save(pilar);

    return pilar.id;
  }
}

export { CreatePilarService };
