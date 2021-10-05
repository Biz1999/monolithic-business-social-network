import { Request, Response } from "express";
import { ListAllPendenteConhecimentoService } from "../services/ListAllPendenteConhecimentoService";

class ListAllPendenteConhecimentoController {
  async handle(request: Request, response: Response) {
    const { start, limit } = request;
    const listAllPendenteConhecimentoService =
      new ListAllPendenteConhecimentoService();

    const pendentes = await listAllPendenteConhecimentoService.execute({
      start,
      limit,
    });

    return response.status(200).json(pendentes);
  }
}

export { ListAllPendenteConhecimentoController };
