import { Request, Response } from "express";
import { ShowConhecimentoColaboradorScoreService } from "../services/ShowConhecimentoColaboradorScoreService";

class ShowAnotherConhecimentoColaboradorScoreController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { redirect_month } = request.query;
      const showConhecimentoColaboradorScoreService =
        new ShowConhecimentoColaboradorScoreService();

      const score = await showConhecimentoColaboradorScoreService.execute({
        id,
        month: Number(redirect_month),
      });

      return response.json(score);
    } catch (error) {
      return response.status(404);
    }
  }
}

export { ShowAnotherConhecimentoColaboradorScoreController };
