import { Request, Response } from "express";
import { ShowSaudeColaboradorScoreService } from "../services/ShowSaudeColaboradorScoreService";

class ShowAnotherColaboradorScoreController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { redirect_month } = request.query;
      const showSaudeColaboradorScoreService =
        new ShowSaudeColaboradorScoreService();

      const score = await showSaudeColaboradorScoreService.execute({
        id,
        month: Number(redirect_month),
      });

      return response.json(score);
    } catch (error) {
      return response.status(404);
    }
  }
}

export { ShowAnotherColaboradorScoreController };
