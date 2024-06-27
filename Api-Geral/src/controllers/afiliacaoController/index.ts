import { Request,Response } from "express"
import {Cadastrar as Cadastro} from "../../services/afiliacao/cadastrar"
import {Editar as Edicao} from "../../services/afiliacao/editar"
import { Listagem as List } from "../../services/afiliacao/listagem"
import { Excluir as Exit} from "../../services/afiliacao/excluir"
import { Produtos as Prod} from "../../services/afiliacao/produtos"

export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await Cadastro(req.body,req.user))
}
export const Editar = async (req:Request,res:Response) =>{
    res.json(await Edicao(req.body,req.user))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await List(req.user,req.params))
}
export const Produtos = async (req:Request,res:Response) =>{
    res.json(await Prod(req.user))
}
export const Excluir = async (req:Request,res:Response) =>{
    res.json(await Exit(req.params,req.user))
}