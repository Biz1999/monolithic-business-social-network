import { getCustomRepository } from "typeorm";
import { SaudeRepositories } from "../repositories/SaudeRepositories";
import { CreatePilarService } from "./CreatePilarService";

interface ISaudeRequest {
  colaborador_id: string;
  categoria: string;
  legenda: string;
}
class CreateSaudeService {
  async execute({ colaborador_id, categoria, legenda }: ISaudeRequest) {
    const saudeRepositories = getCustomRepository(SaudeRepositories);
    const pilarService = new CreatePilarService();

    if (!categoria || !legenda) {
      throw new Error("Campos vazios");
    }

    const pilar_id = await pilarService.execute({ colaborador_id });

    const saude = saudeRepositories.create({
      pilar_id,
      categoria,
      legenda,
    });

    await saudeRepositories.save(saude);

    return saude;
  }
}

export { CreateSaudeService };
