import { Request,Response } from "express"
import {Dashboard as Dados} from "../../services/dashboard"

export const Index = async (req:Request,res:Response) =>{
    res.json(await Dados(req.user))
}