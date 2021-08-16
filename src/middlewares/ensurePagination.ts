import { Request, Response, NextFunction } from "express";

export function ensurePagination(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { _page, limit } = request.query;

  const page = Number(_page);
  const pageLimit = limit ? Number(limit) : 10;

  const startIndex = (page - 1) * pageLimit;

  request.start = startIndex;
  request.limit = pageLimit;

  return next();
}
