import { EntityRepository, Repository } from "typeorm";
import { Interno } from "../models/Interno";

@EntityRepository(Interno)
class InternoRepositories extends Repository<Interno> {}

export { InternoRepositories };
