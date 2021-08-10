import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateConhecimentoPilar1628606353939
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "conhecimento",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "pilar_id",
            type: "uuid",
          },
          {
            name: "categoria",
            type: "varchar",
          },
          {
            name: "titulo",
            type: "varchar",
          },
          {
            name: "descricao",
            type: "varchar",
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
            name: "FKPilarId",
            referencedTableName: "pilares",
            referencedColumnNames: ["id"],
            columnNames: ["pilar_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("conhecimento");
  }
}
