import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";

interface IDocumentsRequest {
  colaborador_id: string;
}

class ListAllDocumentsByIdService {
  async execute({ colaborador_id }: IDocumentsRequest) {
    const conhecimentoRepositories = getCustomRepository(
      ConhecimentoRepositories
    );

    const documents = await conhecimentoRepositories.find({
      where: (qb) => {
        qb.where({
          b: 2,
        }).andWhere("colaborador_id = :colaboradorId", {
          colaboradorId: colaborador_id,
        });
      },
    });

    return documents;
  }
}

export { ListAllDocumentsByIdService };
