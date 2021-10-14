import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { colaborador_id } = request;
    const colaboradorRepositories = getCustomRepository(
      ColaboradorRepositories
    );

    const colaborador = await colaboradorRepositories.findOne({
      id: colaborador_id,
    });

    if (colaborador.isAdmin) return next();
    else return response.status(401).end("Unauthorized");
  } catch (error) {
    return response.status(401).end("Unauthorized");
  }
}
