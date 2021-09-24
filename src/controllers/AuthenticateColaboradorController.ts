import { Request, Response } from "express";
import { AuthenticateColaboradorService } from "../services/AuthenticateColaboradorService";
import { ShowColaboradorRankingService } from "../services/ShowColaboradorRankingService";

class AuthenticateColaboradorController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateColaboradorService = new AuthenticateColaboradorService();

    const token = await authenticateColaboradorService.execute({
      email,
      password,
    });

    return response.status(200).json(token);
  }
}

export { AuthenticateColaboradorController };
