import { Request, Response } from "express";
import { ShowConhecimentoColaboradorScoreService } from "../services/ShowConhecimentoColaboradorScoreService";

class ShowConhecimentoColaboradorScoreController {
  async handle(request: Request, response: Response) {
    try {
      const { colaborador_id } = request;
      const { redirect_month } = request.query;
      const showConhecimentoColaboradorScoreService =
        new ShowConhecimentoColaboradorScoreService();

      const score = await showConhecimentoColaboradorScoreService.execute({
        id: colaborador_id,
        month: Number(redirect_month),
      });

      return response.json(score);
    } catch (error) {
      return response.status(404);
    }
  }
}

export { ShowConhecimentoColaboradorScoreController };
