import { Request, Response } from "express";
import { UpdateColaboradorSaudeService } from "../services/UpdateColaboradorSaudeService";

class UpdateColaboradorSaudeController {
  async handle(request: Request, response: Response) {
    const { status, categoria } = request.body;
    const { pillar_id } = request.params;
    const updateColaboradorSaudeService = new UpdateColaboradorSaudeService();

    const pilar = await updateColaboradorSaudeService.execute({
      pillar_id,
      status,
      categoria,
    });

    return response.status(201).json(pilar);
  }
}

export { UpdateColaboradorSaudeController };
