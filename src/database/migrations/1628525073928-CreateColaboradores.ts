import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateColaboradores1628525073928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "colaboradores",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "setor",
            type: "varchar",
          },
          {
            name: "pontuacao",
            type: "float",
            default: 0,
          },
          {
            name: "peso",
            type: "float",
            default: 0,
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("colaboradores");
  }
}
