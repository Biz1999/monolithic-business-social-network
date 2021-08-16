import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableSaude1628879526385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "saude",
      new TableColumn({
        name: "isAvailable",
        type: "boolean",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("saude", "isAvailable");
  }
}
