import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableConhecimento1631291354063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "conhecimento",
      new TableColumn({
        name: "file",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("conhecimento", "file");
  }
}
