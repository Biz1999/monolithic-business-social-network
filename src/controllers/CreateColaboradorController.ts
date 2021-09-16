import { Request, Response } from "express";
import { CreateColaboradorService } from "../services/CreateColaboradorService";

class CreateColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, email, password, setor } = request.body;

    const createColaboradorService = new CreateColaboradorService();

    const fullName = nome.split(" ");
    const firstName = fullName[0];
    const lastName = fullName[fullName.length - 1];
    let avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
    if ((fullName.length = 1))
      avatar = `https://ui-avatars.com/api/?name=${firstName}`;

    const colaborador = await createColaboradorService.execute({
      nome,
      email,
      password,
      setor,
      avatar,
    });

    return response.status(201).json(colaborador);
  }
}

export { CreateColaboradorController };
