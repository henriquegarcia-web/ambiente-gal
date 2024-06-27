import { Request,Response } from "express";
import { login } from "../../services/usuario/login";
import { EditarUsuario } from "../../services/usuario/editar";
import { EditarDetalhes as EditarDet } from "../../services/usuario/editarDetalhes";
import { Listagem as ListagemUser } from "../../services/usuario/listagem";
import { Cadastrar  as CadastrarUser} from "../../services/usuario/cadastrarUser";
import { ExcluirUsuario } from "../../services/usuario/excluir";
import { GerarToken as Token } from "../../services/usuario/gerarToken";
import { AlterarSenha as mudarSenha } from "../../services/usuario/alterarsenha";
import { ValidarToken } from "../../services/usuario/validarToken";
import { AtualizarDados } from "../../services/usuario/atualizarDados";

export const Login = async (req:Request,res:Response) =>{
    res.json(await login(req.body))
}
export const Cadastrar = async (req:Request,res:Response) =>{
    res.json(await CadastrarUser(req.body))
}
export const Editar = async (req:Request,res:Response) =>{
    res.json(await EditarUsuario(req.body,req.user,req.file))
}
export const EditarDetalhes = async (req:Request,res:Response) =>{
    res.json(await EditarDet(req.body,req.user))
}
export const Listagem = async (req:Request,res:Response) =>{
    res.json(await ListagemUser(req.params,req.user))
}
export const Excluir = async (req:Request,res:Response) =>{
    const permissoesPermitidas:any = {1: true,4: true,5: true};
    res.json(await ExcluirUsuario(Number(req.params.id), permissoesPermitidas[Number(req.params.permissao)]?Number(req.params.permissao):0 ))
}
export const GerarToken = async (req:Request,res:Response) =>{
    res.json(await Token(req.body))
}
export const validarToken = async (req:Request,res:Response) =>{
    res.json(await ValidarToken(req.body))
}
export const AlterarSenha = async (req:Request,res:Response) =>{
    res.json(await mudarSenha(req.body))
}
export const Atualizar = async (req:Request,res:Response) =>{
    res.json(await AtualizarDados(req.body,req.user,req.files))
}