import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableColaboradorSecret1634235281056
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "colaboradores",
      new TableColumn({
        name: "secret_key",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("colaboradores", "secret_key");
  }
}
