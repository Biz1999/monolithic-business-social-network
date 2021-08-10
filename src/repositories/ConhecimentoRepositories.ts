import { EntityRepository, Repository } from "typeorm";
import { Conhecimento } from "../models/Conhecimento";

@EntityRepository(Conhecimento)
class ConhecimentoRepositories extends Repository<Conhecimento> {}

export { ConhecimentoRepositories };
