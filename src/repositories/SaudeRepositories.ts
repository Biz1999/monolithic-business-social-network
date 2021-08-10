import { EntityRepository, Repository } from "typeorm";
import { Saude } from "../models/Saude";

@EntityRepository(Saude)
class SaudeRepositories extends Repository<Saude> {}

export { SaudeRepositories };
