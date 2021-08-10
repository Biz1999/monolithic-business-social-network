import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSaudePilar1628606339619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "saude",
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
            name: "legenda",
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
    await queryRunner.dropTable("saude");
  }
}
