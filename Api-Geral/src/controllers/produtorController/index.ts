import { Request,Response } from "express"
import {Cadastrar as Cadastro} from "../../services/produtor/cadastrar"
import {Editar as Edicao} from "../../services/produtor/editar"
import { Listagem as List } from "../../services/produtor/listagem"
import { Excluir as Exit } from "../../services/produtor/excluir"
import { Taxas as TX } from "../../services/produtor/taxas"

export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await Cadastro(req.body))
}
export const Editar = async (req:Request,res:Response) =>{
    res.json(await Edicao(req.body,req.files))
}
export const Taxas = async (req:Request,res:Response) =>{
    res.json(await TX(req.body))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await List(req.params))
}
export const Excluir = async (req:Request,res:Response) =>{
    res.json(await Exit(req.params))
}