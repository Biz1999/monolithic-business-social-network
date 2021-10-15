import { Request, Response } from "express";
import { UpdateColaboradorConhecimentoService } from "../services/UpdateColaboradorConhecimentoService";

class UpdateColaboradorConhecimentoController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request;
    const { status, categoria, pontuacao, justificativa } = request.body;
    const { pillar_id } = request.params;
    const updateColaboradorConhecimentoService =
      new UpdateColaboradorConhecimentoService();

    const pilar = await updateColaboradorConhecimentoService.execute({
      pillar_id,
      status,
      categoria,
      pontuacao: pontuacao,
      justificativa,
      colaborador_id,
    });

    return response.status(201).json(pilar);
  }
}

export { UpdateColaboradorConhecimentoController };
