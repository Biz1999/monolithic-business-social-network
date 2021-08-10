import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";
import { CreatePilarService } from "./CreatePilarService";

interface IConhecimentoRequest {
  colaborador_id: string;
  categoria: string;
  titulo: string;
  descricao: string;
}

class CreateConhecimentoService {
  async execute({
    colaborador_id,
    categoria,
    titulo,
    descricao,
  }: IConhecimentoRequest) {
    const conhecimentoRepositories = getCustomRepository(
      ConhecimentoRepositories
    );
    const pilarService = new CreatePilarService();

    if (!categoria || !titulo || !descricao) {
      throw new Error("Campos vazios");
    }

    const pilar_id = await pilarService.execute({ colaborador_id });

    const conhecimento = conhecimentoRepositories.create({
      pilar_id,
      categoria,
      titulo,
      descricao,
    });

    await conhecimentoRepositories.save(conhecimento);

    return conhecimento;
  }
}

export { CreateConhecimentoService };
