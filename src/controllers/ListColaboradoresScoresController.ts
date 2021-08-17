import { Request, Response } from "express";
import { ListColaboradoresScoresService } from "../services/ListColaboradoresScoresService";

class ListColaboradoresScoresController {
  async handle(request: Request, response: Response) {
    const listColaboradoresScoresService = new ListColaboradoresScoresService();
    const { start, limit } = request;
    const { redirect_month } = request.query;
    const month = Number(redirect_month);

    const scores = await listColaboradoresScoresService.execute({
      start,
      limit,
      month,
    });

    return response.json(scores);
  }
}

export { ListColaboradoresScoresController };
