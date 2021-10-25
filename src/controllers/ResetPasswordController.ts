import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { colaborador_id } = request;
    const { password } = request.body;
    const { secret_key } = request.params;
    const resetPasswordService = new ResetPasswordService();

    const colaborador = await resetPasswordService.execute({
      colaborador_id,
      secret_key,
      password,
    });

    return response.json(colaborador);
  }
}

export { ResetPasswordController };
