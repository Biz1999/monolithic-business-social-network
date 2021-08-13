import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { ColaboradorRepositories } from "../repositories/ColaboradorRepositories";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const colaboradorRepositories = getCustomRepository(ColaboradorRepositories);
  const authToken = request.headers.authorization;

  if (!authToken) return response.status(401).end("Unauthorized");

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.TOKEN_MD5) as IPayload;

    const { id } = await colaboradorRepositories.findOne(sub);

    if (!id) return response.status(401).end("Unauthorized");

    request.colaborador_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end("Unauthorized");
  }
}
