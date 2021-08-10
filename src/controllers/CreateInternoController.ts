import { Request, Response } from "express";
import { CreateInternoService } from "../services/CreateInternoService";

class CreateInternoController {
  async handle(request: Request, response: Response) {
    const { colaborador_id, nome, descricao, comprovante } = request.body;

    const createInternoService = new CreateInternoService();

    const interno = await createInternoService.execute({
      colaborador_id,
      nome,
      descricao,
      comprovante,
    });

    return response.json(interno);
  }
}

export { CreateInternoController };
