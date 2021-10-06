import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";

interface IShowSaudeRequest {
  conhecimento_id: string;
}

class ShowConhecimentoPillarDataService {
  async execute({ conhecimento_id }: IShowSaudeRequest) {
    try {
      const conhecimentoRepositories = getCustomRepository(
        ConhecimentoRepositories
      );

      const files = conhecimentoRepositories
        .createQueryBuilder("conhecimento")
        .leftJoinAndSelect("conhecimento.pilarId", "pilar")
        .where("conhecimento.id = :conhecimento_id", { conhecimento_id })
        .getOne();

      return classToPlain(files);
    } catch (error) {
      throw new Error();
    }
  }
}

export { ShowConhecimentoPillarDataService };
