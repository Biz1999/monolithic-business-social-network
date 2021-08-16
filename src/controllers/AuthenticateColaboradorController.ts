import { Request, Response } from "express";
import { AuthenticateColaboradorService } from "../services/AuthenticateColaboradorService";

class AuthenticateColaboradorController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateColaboradorService = new AuthenticateColaboradorService();

    const token = await authenticateColaboradorService.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export { AuthenticateColaboradorController };
