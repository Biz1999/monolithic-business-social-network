import { getConnection, getCustomRepository } from "typeorm";
import { Conhecimento } from "../models/Conhecimento";
import { ConhecimentoRepositories } from "../repositories/ConhecimentoRepositories";
import { redisCleanCache } from "../utils/redisCleanCache";
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
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

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

    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Conhecimento)
        .values([conhecimento])
        .updateEntity(true)
        .returning(["id"])
        .execute();

      await queryRunner.commitTransaction();

      redisCleanCache("conhecimentoPendentes");
      redisCleanCache(`${colaborador_id}Documents`);

      await queryRunner.release();

      return result?.raw[0].id;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new Error("Não foi possível salvar");
    }
  }
}

export { CreateConhecimentoService };
