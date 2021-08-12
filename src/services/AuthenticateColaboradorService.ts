import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateColaboradorService {
  async execute({ email, password }: IAuthenticateRequest) {
    const colaboradorRepositories = getCustomRepository(
      ColaboradorRepositories
    );

    const colaborador = await colaboradorRepositories.findOne({ email });

    if (!colaborador) throw new Error("Email/Senha inválida");

    const isPasswordMatch = compare(password, colaborador.password);

    if (!isPasswordMatch) throw new Error("Email/Senha inválida");

    const token = sign(
      {
        email: colaborador.email,
      },
      process.env.TOKEN_MD5,
      {
        subject: colaborador.id,
        expiresIn: "4d",
      }
    );

    return token;
  }
}

export { AuthenticateColaboradorService };
