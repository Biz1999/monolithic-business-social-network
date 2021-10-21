import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { sign } from "jsonwebtoken";

interface IRecoverPasswordRequest {
  email: string;
}

class RecoverPasswordService {
  async execute({ email }: IRecoverPasswordRequest) {
    const colaboradorRepositories = getCustomRepository(
      ColaboradorRepositories
    );

    const { randomBytes } = await import("crypto");

    const colaborador = await colaboradorRepositories.findOne({ email: email });

    if (!colaborador)
      throw new Error("Nenhuma conta foi encontrada para esse email");

    const token = sign({}, process.env.TOKEN_MD5, {
      subject: colaborador.id,
      expiresIn: "1h",
    });

    const secret_key = randomBytes(48).toString("hex");

    const newPassword = await colaboradorRepositories.save({
      id: colaborador.id,
      secret_key,
    });

    return { newPassword, token };
  }
}

export { RecoverPasswordService };
