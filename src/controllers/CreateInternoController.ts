import { Request, Response } from "express";
import { CreateInternoService } from "../services/CreateInternoService";
import ip from "ip";
export interface Photo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class CreateInternoController {
  async handle(request: Request, response: Response) {
    const file = request.file as Photo;
    const { colaborador_id } = request;
    const { nome, descricao } = request.body;

    const createInternoService = new CreateInternoService();

    const interno = await createInternoService.execute({
      colaborador_id,
      nome,
      descricao,
    });

    return response.status(201).json(interno);
  }
}

export { CreateInternoController };
