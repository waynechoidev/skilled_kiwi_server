import { NextFunction, Request, Response } from 'express';
export declare const validate: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
