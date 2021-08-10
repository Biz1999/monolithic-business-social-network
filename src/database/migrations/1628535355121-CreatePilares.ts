import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePilares1628535355121 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "pilares",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "colaborador_id",
            type: "uuid",
          },
          {
            name: "pontuacao",
            type: "float",
            default: 0,
          },
          {
            name: "status",
            type: "varchar",
            default: "'pendente'",
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
        foreignKeys: [
          {
            name: "FKColaboradorSenderPilar",
            referencedTableName: "colaboradores",
            referencedColumnNames: ["id"],
            columnNames: ["colaborador_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("pilares");
  }
}
