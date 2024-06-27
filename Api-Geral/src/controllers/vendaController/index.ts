import { Request,Response } from "express"
import {Cadastrar as Cadastro} from "../../services/venda/cadastrar"
import { Listagem as List } from "../../services/venda/listagem"
import { Excluir as Exit} from "../../services/venda/excluir"
import { retorno } from "../../services/venda/retorno"

export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await Cadastro(req.body,req.useragent))
}
   
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await List(req.user,req.params))
}
export const Retorno = async (req:Request,res:Response) =>{
    res.json(await retorno(req.body))
}
export const Excluir = async (req:Request,res:Response) =>{
    res.json(await Exit(req.params,req.user))
}