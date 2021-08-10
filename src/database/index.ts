import { createConnection } from "typeorm";

const postgreDB = async () => {
  createConnection();
};

export { postgreDB };
