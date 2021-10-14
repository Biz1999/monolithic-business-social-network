import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { classToPlain } from "class-transformer";

interface IUpdateColaboradorRequest {
  id: string;
  nome: string;
  setor: string;
}

class UpdateColaboradorDataService {
  async execute({ id, nome, setor }: IUpdateColaboradorRequest) {
    const colaboradorRepositories = getCustomRepository(
      ColaboradorRepositories
    );

    if (!nome || !setor) throw new Error("Dados faltantes");

    try {
      const colaborador = await colaboradorRepositories.save({
        id,
        nome: nome.trim(),
        setor,
      });
      return classToPlain(colaborador);
    } catch (err) {
      throw new Error("Não foi possível atualizar os dados");
    }
  }
}

export { UpdateColaboradorDataService };
