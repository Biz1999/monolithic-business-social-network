import { getCustomRepository } from "typeorm";
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

    if (!categoria || !legenda || isAvailable === null) {
      throw new Error("Campos vazios");
    }

    const pilar_id = await pilarService.execute({ colaborador_id });

    const saude = saudeRepositories.create({
      pilar_id,
      categoria,
      legenda,
      isAvailable,
    });

    await saudeRepositories.save(saude);

    redisCleanCache(`${colaborador_id}Photos`);

    return saude.id;
  }
}

export { CreateSaudeService };
