import { Request,Response } from "express"
import {Cadastrar as Cadastro} from "../../services/areaMembro/cadastrar"
import {Editar as Edicao} from "../../services/areaMembro/editar"
import { Listagem as ListagemAR } from "../../services/areaMembro/listagem"
import { Excluir as ExcluirAR } from "../../services/areaMembro/excluir"

export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await Cadastro(req.body,req.file,req.user))
}
export const Editar = async (req:Request,res:Response) =>{
    res.json(await Edicao(req.body,req.file,req.user))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await ListagemAR(req.user,req.params))
}
export const Excluir = async (req:Request,res:Response) =>{
    res.json(await ExcluirAR(req.params,req.user))
}