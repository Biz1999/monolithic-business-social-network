import { Request, Response } from "express";
import { UpdateColaboradorDataService } from "../services/UpdateColaboradorDataService";

class UpdateColaboradorDataController {
  async handle(request: Request, response: Response) {
    const { nome, setor } = request.body;
    const { colaborador_id } = request;
    const updateColaboradorDataService = new UpdateColaboradorDataService();

    const colaborador = await updateColaboradorDataService.execute({
      nome,
      setor,
      id: colaborador_id,
    });

    return response.status(200).json(colaborador);
  }
}

export { UpdateColaboradorDataController };
