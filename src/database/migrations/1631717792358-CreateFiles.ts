import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFiles1631717792358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "files",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "conhecimento_id",
            type: "uuid",
          },
          {
            name: "uri",
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
            name: "FKConhecimentoId",
            referencedTableName: "conhecimento",
            referencedColumnNames: ["id"],
            columnNames: ["conhecimento_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("files");
  }
}
