import { Request, Response } from "express";
import { ListAllPendenteSaudeService } from "../services/ListAllPendenteSaudeService";

class ListAllPendenteSaudeController {
  async handle(request: Request, response: Response) {
    const { start, limit } = request;
    const listAllPendenteSaudeService = new ListAllPendenteSaudeService();

    const pendentes = await listAllPendenteSaudeService.execute({
      start,
      limit,
    });

    return response.status(200).json(pendentes);
  }
}

export { ListAllPendenteSaudeController };
