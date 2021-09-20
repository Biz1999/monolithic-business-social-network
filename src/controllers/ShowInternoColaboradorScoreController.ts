import { Request, Response } from "express";
import { ShowInternoColaboradorScoreService } from "../services/ShowInternoColaboradorScoreService";

class ShowInternoColaboradorScoreController {
  async handle(request: Request, response: Response) {
    try {
      const { colaborador_id } = request;
      const { nome } = request.params;
      const { redirect_month } = request.query;
      const showInternoColaboradorScoreService =
        new ShowInternoColaboradorScoreService();

      const possible_names = ["rsi", "wtt", "qualidade"];

      if (!possible_names.includes(nome))
        return response.status(404).json({ pilar: "pilar não existe" });

      const score = await showInternoColaboradorScoreService.execute({
        id: colaborador_id,
        nome,
        month: Number(redirect_month),
      });

      return response.json(score);
    } catch (error) {
      return response.status(404);
    }
  }
}

export { ShowInternoColaboradorScoreController };
