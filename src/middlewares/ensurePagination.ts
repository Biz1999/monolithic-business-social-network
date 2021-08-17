import { Request, Response, NextFunction } from "express";

export function ensurePagination(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { _page, limit } = request.query;

  const page = _page ? Number(_page) : 1;
  const pageLimit = limit ? Number(limit) : 10;

  const startIndex = (page - 1) * pageLimit;

  request.start = startIndex;
  request.limit = pageLimit;

  return next();
}
