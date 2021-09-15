import { Request, Response } from "express";
import { CreateSaudeService } from "../services/CreateSaudeService";

class CreateSaudeController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request;
    const { categoria, legenda, isAvailable } = request.body;
    const createSaudeService = new CreateSaudeService();

    const saude = await createSaudeService.execute({
      colaborador_id,
      categoria,
      legenda,
      isAvailable,
    });

    return response.status(201).json(saude);
  }
}

export { CreateSaudeController };
