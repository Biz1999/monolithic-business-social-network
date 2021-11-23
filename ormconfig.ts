module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 3333,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  cache: { type: "ioredis" },
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/models/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/models",
  },
};
