import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";
import { CreatePilarService } from "./CreatePilarService";

interface IConhecimentoRequest {
  colaborador_id: string;
  categoria: "article" | "book" | "lecture";
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

    if (!categoria || !descricao) {
      throw new Error("Campos vazios");
    }

    if (
      categoria !== "article" &&
      categoria !== "book" &&
      categoria !== "lecture"
    ) {
      throw new Error("Categoria não aceita");
    }

    const pilar_id = await pilarService.execute({ colaborador_id });

    const conhecimento = conhecimentoRepositories.create({
      pilar_id,
      categoria,
      titulo,
      descricao,
    });

    await conhecimentoRepositories.save(conhecimento);

    return conhecimento.id;
  }
}

export { CreateConhecimentoService };
