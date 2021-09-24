import { Request, Response } from "express";
import { ShowColaboradorRankingService } from "../services/ShowColaboradorRankingService";

class ShowColaboradorRankingController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request;
    const { redirect_month } = request.query;
    const showColaboradorRankingService = new ShowColaboradorRankingService();

    const ranking = await showColaboradorRankingService.execute({
      id: colaborador_id,
      month: Number(redirect_month),
    });

    return response.json(ranking);
  }
}

export { ShowColaboradorRankingController };
