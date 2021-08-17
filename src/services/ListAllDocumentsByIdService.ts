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
      where: {
        pilarId: {
          colaborador_id: colaborador_id,
        },
      },
      order: {
        created_at: "DESC",
      },
      relations: ["pilarId"],
    });

    return documents;
  }
}

export { ListAllDocumentsByIdService };
