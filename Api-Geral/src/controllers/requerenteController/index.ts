import { Request,Response } from "express"
import {Editar as Edicao} from "../../services/requerente/editar"
import { Listagem as List } from "../../services/requerente/listagem"

export const Editar = async (req:Request,res:Response) =>{
    res.json(await Edicao(req.body,req.user))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await List(req.user,req.params))
}