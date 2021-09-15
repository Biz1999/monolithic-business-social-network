import { EntityRepository, Repository } from "typeorm";
import { File } from "../models/File";

@EntityRepository(File)
class FileRepositories extends Repository<File> {}

export { FileRepositories };
