import { createConnection } from "typeorm";

const postgreDB = async () => {
  try {
    createConnection();
  } catch (error) {
    throw new Error("Não foi possível conectar ao banco");
  }
};

export { postgreDB };
