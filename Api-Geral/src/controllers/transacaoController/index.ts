import { Request,Response } from "express"
import {Cadastrar as Cadastro} from "../../services/transacao/cadastrar"
import { Listagem as List } from "../../services/transacao/listagem"
import { Status as Validacao } from "../../services/transacao/status"


export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await Cadastro(req.body,req.user))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await List(req.user,req.params))
}
export const Status = async (req:Request,res:Response) =>{
    res.json(await Validacao(req.body))
}