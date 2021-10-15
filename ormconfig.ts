module.exports = {
  type: "postgres",
  host: process.env.DB_HOST_DAAS,
  port: 5432,
  username: process.env.DB_USER_DAAS,
  password: process.env.DB_PASS_DAAS,
  database: process.env.DB_NAME_DAAS,
  cache: { duration: 20000 },
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/models/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/models",
  },
};
