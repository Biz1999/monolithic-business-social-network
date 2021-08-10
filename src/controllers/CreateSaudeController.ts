import { Request, Response } from "express";
import { CreateSaudeService } from "../services/CreateSaudeService";

class CreateSaudeController {
  async handle(request: Request, response: Response) {
    const { colaborador_id, categoria, legenda } = request.body;
    const createSaudeService = new CreateSaudeService();

    const saude = await createSaudeService.execute({
      colaborador_id,
      categoria,
      legenda,
    });

    return response.json(saude);
  }
}

export { CreateSaudeController };
