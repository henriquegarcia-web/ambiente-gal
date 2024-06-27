import { Request,Response } from "express"
import {Cadastrar as Cadastro} from "../../services/webhook/cadastrar"
import {Editar as Edicao} from "../../services/webhook/editar"
import { Listagem as List } from "../../services/webhook/listagem"
import { Excluir as Exit} from "../../services/webhook/excluir"

export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await Cadastro(req.body,req.file,req.user))
}
export const Editar = async (req:Request,res:Response) =>{
    res.json(await Edicao(req.body,req.file,req.user))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await List(req.user,req.params))
}
export const Excluir = async (req:Request,res:Response) =>{
    res.json(await Exit(req.params,req.user))
}