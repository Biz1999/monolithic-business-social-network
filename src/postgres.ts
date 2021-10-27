import { Pool } from "pg";

export async function createConnection() {
  const pool = new Pool({
    host: process.env.DB_HOST_DAAS,
    port: 5432,
    user: process.env.DB_USER_DAAS,
    password: process.env.DB_PASS_DAAS,
    database: process.env.DB_NAME_DAAS,
  });

  await pool.connect();
  return pool;
}
