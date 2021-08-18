import { Request, Response, NextFunction } from "express";

export function ensurePagination(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { _page, limit } = request.query;
  try {
    const page = Number(_page) ? Number(_page) : 1;
    const pageLimit = Number(limit) ? Number(limit) : 10;
    const startIndex = (page - 1) * pageLimit;

    request.start = startIndex;
    request.limit = pageLimit;

    return next();
  } catch (error) {
    console.log("aqui");
    return response.json(error);
  }
}
