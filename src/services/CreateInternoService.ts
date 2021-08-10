import { getCustomRepository } from "typeorm";
import { InternoRepositories } from "../repositories/InternoRepositories";
import { CreatePilarService } from "./CreatePilarService";

interface IInternoRequest {
  colaborador_id: string;
  nome: string;
  descricao: string;
  comprovante: string;
}

class CreateInternoService {
  async execute({
    colaborador_id,
    nome,
    descricao,
    comprovante = "",
  }: IInternoRequest) {
    const internoRepositories = getCustomRepository(InternoRepositories);
    const pilarService = new CreatePilarService();

    if (!descricao) {
      throw new Error("Campos vazios");
    }

    const pilar_id = await pilarService.execute({ colaborador_id });

    const interno = internoRepositories.create({
      pilar_id,
      nome,
      descricao,
      comprovante,
    });

    await internoRepositories.save(interno);

    return interno;
  }
}

export { CreateInternoService };
