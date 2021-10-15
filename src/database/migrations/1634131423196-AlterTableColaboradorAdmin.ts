import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableColaboradorAdmin1634131423196
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("colaboradores", [
      new TableColumn({
        name: "isAdmin",
        type: "boolean",
        default: false,
      }),
      new TableColumn({
        name: "isActive",
        type: "boolean",
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "colaboradores" 
        DROP COLUMN "isAdmin", DROP COLUMN "isActive"`
    );
  }
}
