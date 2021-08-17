import { Request, Response } from "express";
import { CreateColaboradorService } from "../services/CreateColaboradorService";

class CreateColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, email, password, setor } = request.body;

    const createColaboradorService = new CreateColaboradorService();

    const colaborador = await createColaboradorService.execute({
      nome,
      email,
      password,
      setor,
    });

    return response.status(201).json(colaborador);
  }
}

export { CreateColaboradorController };
