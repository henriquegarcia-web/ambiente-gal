import { Request,Response } from "express";
import { Services } from "../services";

export const index = async (req:Request,res:Response) =>{
    res.json( await Services(req.body) )
}
