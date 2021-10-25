import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";

interface IResetPasswordRequest {
  colaborador_id: string;
  secret_key: string;
  password: string;
}

class ResetPasswordService {
  async execute({
    colaborador_id,
    secret_key,
    password,
  }: IResetPasswordRequest) {
    const colaboradorRepositories = getCustomRepository(
      ColaboradorRepositories
    );

    const colaborador = await colaboradorRepositories.findOne({
      id: colaborador_id,
    });

    if (!colaborador) throw new Error("Não foi possível atualizar a senha");

    if (colaborador.secret_key !== secret_key)
      throw new Error("Não foi possível atualizar a senha");

    const hashedPassword = await hash(password, 8);

    const newPassword = await colaboradorRepositories.save({
      id: colaborador_id,
      password: hashedPassword,
      secret_key: null,
    });

    return classToPlain(newPassword);
  }
}

export { ResetPasswordService };
