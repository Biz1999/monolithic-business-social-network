import { Request, Response } from "express";
import { CreatePilarService } from "../services/CreatePilarService";

class CreatePilarController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request.body;

    const createPilarService = new CreatePilarService();

    const pilar = await createPilarService.execute({ colaborador_id });

    return response.status(201).json(pilar);
  }
}

export { CreatePilarController };
