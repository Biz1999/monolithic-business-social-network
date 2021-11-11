import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBaseRank1634315921343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "base",
        columns: [
          // {
          //   name: "id",
          //   type: "uuid",
          //   isPrimary: true,
          // },
          {
            name: "colaborador",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "setor",
            type: "varchar",
          },
          {
            name: "resumos_livros_artigos",
            type: "float",
            isNullable: true,
          },
          {
            name: "treinamentos_palestras_cursos",
            type: "float",
            isNullable: true,
          },
          {
            name: "artigo",
            type: "float",
            isNullable: true,
          },
          {
            name: "licoes_aprendidas",
            type: "float",
            isNullable: true,
          },
          {
            name: "quiz",
            type: "float",
            isNullable: true,
          },
          {
            name: "atividade_fisica",
            type: "float",
            isNullable: true,
          },
          {
            name: "alimentacao_saudavel",
            type: "float",
            isNullable: true,
          },
          {
            name: "qualidade",
            type: "float",
            isNullable: true,
          },
          {
            name: "walk_the_talk",
            type: "float",
            isNullable: true,
          },
          {
            name: "responsabilidade_social",
            type: "float",
            isNullable: true,
          },
          {
            name: "total",
            type: "float",
            default: 0,
          },
          {
            name: "carteira",
            type: "float",
            default: 0,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("base");
  }
}
