import { getCustomRepository } from "typeorm";
import { FileRepositories } from "../repositories/FileRepositories";

interface IFileRequest {
  conhecimento_id: string;
  uri: string;
}

class CreateFileService {
  async execute({ conhecimento_id, uri }: IFileRequest) {
    const fileRepositories = getCustomRepository(FileRepositories);

    const newFile = fileRepositories.create({
      conhecimento_id,
      uri,
    });

    try {
      await fileRepositories.save(newFile);
    } catch (error) {
      console.log(error);
      throw new Error("Arquivo não pode ser salvo");
    }
  }
}

export { CreateFileService };
