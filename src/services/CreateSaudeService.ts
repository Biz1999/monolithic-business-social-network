import { getCustomRepository, getConnection } from "typeorm";
import { Saude } from "../models/Saude";
import { SaudeRepositories } from "../repositories/SaudeRepositories";
import { redisCleanCache } from "../utils/redisCleanCache";
import { CreatePilarService } from "./CreatePilarService";

interface ISaudeRequest {
  colaborador_id: string;
  categoria: string;
  legenda: string;
  isAvailable: boolean;
}
class CreateSaudeService {
  async execute({
    colaborador_id,
    categoria,
    legenda,
    isAvailable,
  }: ISaudeRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);
    const pilarService = new CreatePilarService();
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    if (!categoria || !legenda || isAvailable === null) {
      throw new Error("Campos vazios");
    }

    const pilar_id = await pilarService.execute({ colaborador_id });

    redisCleanCache("saudePendentes");
    redisCleanCache(`${colaborador_id}Photos`);

    const saude = saudeRepositories.create({
      pilar_id,
      categoria,
      legenda,
      isAvailable,
    });

    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Saude)
        .values([saude])
        .updateEntity(true)
        .returning(["id"])
        .execute();

      await queryRunner.commitTransaction();
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

export { CreateSaudeService };
