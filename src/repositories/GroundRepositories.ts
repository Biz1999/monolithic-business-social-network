import { EntityRepository, Repository } from "typeorm";
import { Ground } from "../models/Ground";

@EntityRepository(Ground)
class GroundRepositories extends Repository<Ground> {}

export { GroundRepositories };
