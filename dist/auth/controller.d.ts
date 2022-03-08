import { Request, Response } from 'express';
export declare function signUp(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function signIn(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function reIssueToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function checkUsername(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function checkEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
