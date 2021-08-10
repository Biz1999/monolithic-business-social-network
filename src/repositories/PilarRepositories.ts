import { Repository, EntityRepository } from "typeorm";
import { Pilar } from "../models/Pilar";

@EntityRepository(Pilar)
class PilarRepositories extends Repository<Pilar> {}

export { PilarRepositories };
