import { NextFunction, Response, Request } from "express";

export const asyncHandler =
  (fun: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next);
    } catch (error: any) {
      res.status(error.code || 500).json(error);
    }
  };
