import { error } from 'console';
//midlewares para validar
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";


export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) =>{
        try{
            schema.parse(req.body);
            next();
        }
        catch(error:any){
            res.status(400).json({
                error: 'error de validacion',
                detalles: error.errors || error.messages
            });
        }
    };
};



