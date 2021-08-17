import { Request, Response } from "express";
import { ListAllColaboradoresPostsService } from "../services/ListAllColaboradoresPostsService";

class ListAllColaboradoresPostsController {
  async handle(request: Request, response: Response) {
    const { colaborador_id, start, limit } = request;
    const listAllColaboradoresPostsService =
      new ListAllColaboradoresPostsService();

    const photos = await listAllColaboradoresPostsService.execute({
      start,
      limit,
      colaborador_id,
    });

    return response.status(200).json(photos);
  }
}

export { ListAllColaboradoresPostsController };
