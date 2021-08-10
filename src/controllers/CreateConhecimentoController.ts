import { Request, Response } from "express";
import { CreateConhecimentoService } from "../services/CreateConhecimentoService";

class CreateConhecimentoController {
  async handle(request: Request, response: Response) {
    const { colaborador_id, categoria, titulo, descricao } = request.body;

    const createConhecimentoService = new CreateConhecimentoService();

    const conhecimento = await createConhecimentoService.execute({
      colaborador_id,
      categoria,
      titulo,
      descricao,
    });

    return response.json(conhecimento);
  }
}

export { CreateConhecimentoController };
