import { Request, Response } from "express";
import { ShowConhecimentoColaboradorScoreService } from "../services/ShowConhecimentoColaboradorScoreService";
import { ShowInternoColaboradorScoreService } from "../services/ShowInternoColaboradorScoreService";
import { ShowSaudeColaboradorScoreService } from "../services/ShowSaudeColaboradorScoreService";

class ShowAllPillarFromAnotherColaborador {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { redirect_month } = request.query;
      const showConhecimentoColaboradorScoreService =
        new ShowConhecimentoColaboradorScoreService();
      const showSaudeColaboradorScoreService =
        new ShowSaudeColaboradorScoreService();
      const showInternoColaboradorScoreService =
        new ShowInternoColaboradorScoreService();

      let scores = [];

      Promise.all([
        await showSaudeColaboradorScoreService
          .execute({
            id,
            month: Number(redirect_month),
          })
          .then(({ pontuacao_do_mes }) =>
            scores.push({ pilar: "saude", pontuacao_do_mes })
          ),
        await showConhecimentoColaboradorScoreService
          .execute({
            id,
            month: Number(redirect_month),
          })
          .then(({ pontuacao_do_mes }) =>
            scores.push({ pilar: "conhecimento", pontuacao_do_mes })
          ),

        await showInternoColaboradorScoreService
          .execute({
            id,
            nome: "rsi",
            month: Number(redirect_month),
          })
          .then(({ pontuacao_do_mes }) =>
            scores.push({ pilar: "rsi", pontuacao_do_mes })
          ),

        await showInternoColaboradorScoreService
          .execute({
            id,
            nome: "wtt",
            month: Number(redirect_month),
          })
          .then(({ pontuacao_do_mes }) =>
            scores.push({ pilar: "wtt", pontuacao_do_mes })
          ),
        await showInternoColaboradorScoreService
          .execute({
            id,
            nome: "qualidade",
            month: Number(redirect_month),
          })
          .then(({ pontuacao_do_mes }) =>
            scores.push({ pilar: "qualidade", pontuacao_do_mes })
          ),
      ]).then(() => {});

      return response.json(scores);
    } catch (error) {
      return response.status(404);
    }
  }
}

export { ShowAllPillarFromAnotherColaborador };
