import { BaseRank } from "../models/BaseRank";
import { ExcelTableService } from "../services/ExcelTableService";
import fs from "fs";
import parse from "csv-parse";

let colaboradores = [];

function addData(
  colaborador: string,
  setor: string,
  resumos_livros_artigos: number,
  treinamentos_palestras_cursos: number,
  artigo: number,
  licoes_aprendidas: number,
  quiz: number,
  atividade_fisica: number,
  alimentacao_saudavel: number,
  qualidade: number,
  walk_the_talk: number,
  responsabilidade_social: number,
  total: number,
  carteira: number
) {
  var data = {
    colaborador,
    setor,
    resumos_livros_artigos,
    treinamentos_palestras_cursos,
    artigo,
    licoes_aprendidas,
    quiz,
    atividade_fisica,
    alimentacao_saudavel,
    qualidade,
    walk_the_talk,
    responsabilidade_social,
    total,
    carteira,
  };
  colaboradores.push(data); //should add a new line
}

class ExcelTableController {
  async handle() {
    const excelTableService = new ExcelTableService();
    const inputPath =
      "../../../SPI Integracao de Sistemas Ltda/Superar-Para-Inovar-CDN - API-Armazenamento/ranking.csv";

    const file = fs.readFileSync(inputPath);
    parse(
      file,
      { columns: true, delimiter: ",", encoding: "utf-8" },
      function (err, results) {
        if (err) {
          return console.log(err);
        }
        for (const row of results) {
          //loop through each object parsed from the csv
          addData(
            row["Colaborador"],
            row["Unidade"],
            Number(row["Resumo de Livros e Artigos"].replace(",", ".")),
            Number(row["Treinamentos, Palestras e Cursos"].replace(",", ".")),
            Number(row["Artigo"].replace(",", ".")),
            Number(row["Lições Aprendidas"].replace(",", ".")),
            Number(row["Quiz"].replace(",", ".")),
            Number(row["Atividade Física"].replace(",", ".")),
            Number(row["Alimentação Saudável"].replace(",", ".")),
            Number(row["Qualidade"].replace(",", ".")),
            Number(row["Walk The Talk"].replace(",", ".")),
            Number(row["Responsabilidade Social Individual"].replace(",", ".")),
            Number(row["TOTAL"].replace(",", ".")),
            Number(row["CARTEIRA"].replace(",", "."))
          );
        }
        excelTableService.execute({ colaboradores }); // this should be populated properly

        /* Do anything that needs to use colaboradores here */
      }
    );
  }
}

export { ExcelTableController };
