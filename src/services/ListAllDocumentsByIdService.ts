import { classToPlain } from "class-transformer";
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

    const documents = await conhecimentoRepositories
      .createQueryBuilder("documento")
      .leftJoinAndSelect("documento.pilarId", "pilar")
      .where("pilar.colaborador_id = :id", { id: colaborador_id })
      .orderBy("pilar.created_at", "DESC")
      //.leftJoinAndSelect("documento.files", "files")
      .getMany();

    return classToPlain(documents);
  }
}

export { ListAllDocumentsByIdService };
