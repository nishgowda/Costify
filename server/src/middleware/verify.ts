import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session!.userId !== undefined) {
        next();
    } else {
        console.log(req.session!.userId);
        res.status(404).send("Unauthorized");
    }
}

