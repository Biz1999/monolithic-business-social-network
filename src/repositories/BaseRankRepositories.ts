import { EntityRepository, Repository } from "typeorm";
import { BaseRank } from "../models/BaseRank";

@EntityRepository(BaseRank)
class BaseRankRepositories extends Repository<BaseRank> {}

export { BaseRankRepositories };
