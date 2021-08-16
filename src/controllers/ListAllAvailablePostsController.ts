import { Request, Response } from "express";
import { ListAllAvailablePostsService } from "../services/ListAllAvailablePostsService";

class ListAllAvailablePostsController {
  async handle(request: Request, response: Response) {
    const listAllAvailablePostsService = new ListAllAvailablePostsService();
    const { start, limit } = request;

    const feed = await listAllAvailablePostsService.execute({ start, limit });

    return response.status(200).json(feed);
  }
}

export { ListAllAvailablePostsController };
