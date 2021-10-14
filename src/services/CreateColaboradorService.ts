import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

interface ICreateColaboradorRequest {
  nome: string;
  email: string;
  password: string;
  setor: string;
  avatar: string;
  pontuacao?: number;
  peso?: number;
}

class CreateColaboradorService {
  async execute({
    nome,
    email,
    password,
    setor,
    avatar,
    pontuacao = 0,
    peso = 0,
  }: ICreateColaboradorRequest) {
    const colaboradorRepository = getCustomRepository(ColaboradorRepositories);

    if (!email) throw new Error("Email inválido");

    const isEmailAlreadyExists = await colaboradorRepository.findOne({ email });

    if (isEmailAlreadyExists) throw new Error(`Email já cadastrado`);

    const hashedPassword = await hash(password, 8);

    const colaborador = colaboradorRepository.create({
      nome: nome.trim(),
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
