import { getCustomRepository } from "typeorm";
import { PilarRepositories } from "../repositories/PilarRepositories";

interface IPilarRequest {
  colaborador_id: string;
  status?: string;
}

class CreatePilarService {
  async execute({ colaborador_id, status = "pendente" }: IPilarRequest) {
    const pilarRepositories = getCustomRepository(PilarRepositories);

    const pilar = pilarRepositories.create({
      colaborador_id,
      status,
    });

    await pilarRepositories.save(pilar);

    return pilar.id;
  }
}

export { CreatePilarService };
