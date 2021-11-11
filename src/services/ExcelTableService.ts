import { getCustomRepository, getConnection, getManager } from "typeorm";
import { BaseRank } from "../models/BaseRank";
import { BaseRankRepositories } from "../repositories/BaseRankRepositories";
import { TableToCSVService } from "./TableToCSVService";

interface IExcelRowRequest {
  colaborador: string;
  setor: string;
  resumos_livros_artigos: number;
  treinamentos_palestras_cursos: number;
  artigo: number;
  licoes_aprendidas: number;
  quiz: number;
  atividade_fisica: number;
  alimentacao_saudavel: number;
  qualidade: number;
  walk_the_talk: number;
  responsabilidade_social: number;
  total: number;
  carteira: number;
}

interface IExcelRequest {
  colaboradores: IExcelRowRequest[];
}

class ExcelTableService {
  async execute({ colaboradores }: IExcelRequest) {
    const baseRepositories = getCustomRepository(BaseRankRepositories);
    const tableToCSVService = new TableToCSVService();
    const updates = colaboradores.map((colaborador) =>
      baseRepositories.create(colaborador)
    );
    await baseRepositories.save(updates);

    await new Promise((f) => setTimeout(f, 2000));
    await tableToCSVService.execute();
  }
}

export { ExcelTableService };
