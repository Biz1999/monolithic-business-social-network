import { getCustomRepository } from "typeorm";
import { BaseRankRepositories } from "../repositories/BaseRankRepositories";
import fs from "fs";

class TableToCSVService {
  async execute() {
    const baseRepositories = getCustomRepository(BaseRankRepositories);

    const colaboradores = await baseRepositories.find({
      order: { total: "DESC" },
    });

    const csvString = [
      [
        "",
        "Colaborador",
        "Unidade",
        "Resumo de Livros e Artigos",
        "Treinamentos, Palestras e Cursos",
        "Artigo",
        "Lições Aprendidas",
        "Quiz",
        "Atividade Física",
        "Alimentação Saudável",
        "Qualidade",
        "Walk The Talk",
        "Responsabilidade Social Individual",
        "TOTAL",
        "CARTEIRA",
      ],
      ...colaboradores.map((colaborador, index) => [
        index + 1,
        String(colaborador.colaborador),
        String(colaborador.setor),
        Number.isInteger(colaborador.resumos_livros_artigos)
          ? colaborador.resumos_livros_artigos === 0
            ? ""
            : colaborador.resumos_livros_artigos
          : String(`"` + colaborador.resumos_livros_artigos + `"`).replace(
              ".",
              ","
            ),
        Number.isInteger(colaborador.treinamentos_palestras_cursos)
          ? colaborador.treinamentos_palestras_cursos === 0
            ? ""
            : colaborador.treinamentos_palestras_cursos
          : String(
              `"` + colaborador.treinamentos_palestras_cursos + `"`
            ).replace(".", ","),
        Number.isInteger(colaborador.artigo)
          ? colaborador.artigo === 0
            ? ""
            : 0
          : String(`"` + colaborador.artigo + `"`).replace(".", ","),
        Number.isInteger(colaborador.licoes_aprendidas)
          ? colaborador.licoes_aprendidas === 0
            ? ""
            : colaborador.licoes_aprendidas
          : String(`"` + colaborador.licoes_aprendidas + `"`).replace(".", ","),
        Number.isInteger(colaborador.quiz)
          ? colaborador.quiz === 0
            ? ""
            : colaborador.quiz
          : String(`"` + colaborador.quiz + `"`).replace(".", ","),
        Number.isInteger(colaborador.atividade_fisica)
          ? colaborador.atividade_fisica === 0
            ? ""
            : colaborador.atividade_fisica
          : String(`"` + colaborador.atividade_fisica + `"`).replace(".", ","),
        Number.isInteger(colaborador.alimentacao_saudavel)
          ? colaborador.alimentacao_saudavel === 0
            ? ""
            : colaborador.alimentacao_saudavel
          : String(`"` + colaborador.alimentacao_saudavel + `"`).replace(
              ".",
              ","
            ),
        Number.isInteger(colaborador.qualidade)
          ? colaborador.qualidade === 0
            ? ""
            : colaborador.qualidade
          : String(`"` + colaborador.qualidade + `"`).replace(".", ","),
        Number.isInteger(colaborador.walk_the_talk)
          ? colaborador.walk_the_talk === 0
            ? ""
            : colaborador.walk_the_talk
          : String(`"` + colaborador.walk_the_talk + `"`).replace(".", ","),
        Number.isInteger(colaborador.responsabilidade_social)
          ? colaborador.responsabilidade_social === 0
            ? ""
            : colaborador.responsabilidade_social
          : String(`"` + colaborador.responsabilidade_social + `"`).replace(
              ".",
              ","
            ),
        Number.isInteger(colaborador.total)
          ? colaborador.total
          : String(`"` + colaborador.total + `"`).replace(".", ","),
        Number.isInteger(colaborador.carteira)
          ? colaborador.carteira
          : String(`"` + colaborador.carteira + `"`).replace(".", ","),
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    // console.log(csvString);
    fs.writeFileSync(
      "../../../SPI Integracao de Sistemas Ltda/Superar-Para-Inovar-CDN - API-Armazenamento/export.csv",
      csvString
    );
  }
}

export { TableToCSVService };
