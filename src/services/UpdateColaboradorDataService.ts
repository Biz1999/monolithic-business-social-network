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

    if (!nome) throw new Error("Nome não informado");
    if (!setor) throw new Error("Setor não informado");

    const setores = ["ADM", "AT", "IC", "IT", "OT", "PMO", "SUL", "VENDAS"];

    if (!setores.includes(setor)) throw new Error("Setor não reconhecido");

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
