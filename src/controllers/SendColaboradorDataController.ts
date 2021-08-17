import { Request, Response } from "express";
import { SendColaboradorDataService } from "../services/SendColaboradorDataService";

class SendColaboradorDataController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request;
    const sendColaboradorDataService = new SendColaboradorDataService();

    const colaborador = await sendColaboradorDataService.execute({
      id: colaborador_id,
    });

    return response.status(200).json(colaborador);
  }
}

export { SendColaboradorDataController };
