import { Request, Response } from "express";
import { ListAllDocumentsByIdService } from "../services/ListAllDocumentsByIdService";

class ListAllDocumentsByIdController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request;
    const listAllDocumentsByIdService = new ListAllDocumentsByIdService();

    const documents = await listAllDocumentsByIdService.execute({
      colaborador_id,
    });

    return response.status(200).json(documents);
  }
}

export { ListAllDocumentsByIdController };
