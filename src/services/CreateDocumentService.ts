import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";

interface IDocumentsRequest {
  conhecimento_id: string;
  fileuri: string;
}

class CreateDocumentService {
  async execute({ conhecimento_id, fileuri }: IDocumentsRequest) {
    const conhecimentoRepositories = getCustomRepository(
      ConhecimentoRepositories
    );

    if (!conhecimento_id) throw new Error("É necessário informar o Pilar!");

    const conhecimento = await conhecimentoRepositories.save({
      id: conhecimento_id,
      file: fileuri,
    });

    return conhecimento;
  }
}

export { CreateDocumentService };
