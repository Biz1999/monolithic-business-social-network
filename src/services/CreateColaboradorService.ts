import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

interface ICreateColaboradorRequest {
  nome: string;
  email: string;
  password: string;
  setor: string;
  pontuacao?: number;
  peso?: number;
}

class CreateColaboradorService {
  async execute({
    nome,
    email,
    password,
    setor,
    pontuacao = 0,
    peso = 0,
  }: ICreateColaboradorRequest) {
    const colaboradorRepository = getCustomRepository(ColaboradorRepositories);

    if (!email) throw new Error("Invalid email");

    const isEmailAlreadyExists = await colaboradorRepository.findOne({ email });

    if (isEmailAlreadyExists) throw new Error(`Email ${email} already exists`);

    const hashedPassword = await hash(password, 8);
    const avatar = "";

    const colaborador = colaboradorRepository.create({
      nome,
      email,
      password: hashedPassword,
      setor,
      pontuacao,
      peso,
      avatar,
    });

    await colaboradorRepository.save(colaborador);

    return classToPlain(colaborador);
  }
}

export { CreateColaboradorService };
