import { Cliente } from "../../models/cliente"
import { CadastrarUsuario } from "../usuario/cadastrar"
import { ValidarEmail } from "../usuario/validarEmail"
import { Valida } from "./valida"

export const Cadastrar = async (body:any,user:any) =>{
    let { nome,email,cpfCnpj,cep,rua,numero,bairro,cidade,estado,idVenda} = body
    let resposta:any
    let idProdutor = user?.idConta
    let validaUser = await ValidarEmail(email)
    
    if(email && cpfCnpj && idProdutor){
        if(validaUser){
            let valida = await Valida(idProdutor,email)
            if(valida){
                let cadastrar = await Cliente.create({idProdutor,idVenda:idVenda?idVenda:0, nome,email,cpfCnpj,cep,rua,numero,bairro,cidade,estado})
                if(cadastrar?.id){
                    let cadastrarUser = await CadastrarUsuario(cadastrar.id,nome,email,cpfCnpj,2)
                    if(cadastrarUser.id){
                        resposta = {msg:'Cadastro realizado com sucesso!',error:false,id:cadastrar.id}
                    }else{
                        resposta = {msg:'Error, tente novamente mais tarde!',error:true}
                    }
                }else{
                    resposta = {msg:'Error, tente novamente mais tarde!',error:true}
                }
            }else{
                resposta = {msg:'Dados já cadastrado!',error:true}
            }
        }else{
            resposta = {msg:'Email já utilizado!',error:true}
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}