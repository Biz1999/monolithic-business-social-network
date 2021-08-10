import { EntityRepository, Repository } from "typeorm";
import { Colaborador } from "../models/Colaborador";

@EntityRepository(Colaborador)
class ColaboradorRepositories extends Repository<Colaborador> {}

export { ColaboradorRepositories };
