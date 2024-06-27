import { Produtor } from "../../models/produtor"
import { CadastrarUsuario } from "../usuario/cadastrar"
import { ValidarEmail } from "../usuario/validarEmail"
import { Valida } from "./valida"

export const Cadastrar = async (body:any) =>{
    let { email,password,nome,cpfCnpj,cep,rua,numero,bairro,cidade,estado,titular,tipoConta,banco,agencia,agenciaDig,conta,contaDig,chavePix,tipoChave} = body
    let resposta:any
    let validaUser = await ValidarEmail(email)
    if(email && (cpfCnpj || password)){
        if(validaUser){
            let valida = await Valida(email)
            if(valida){
                let cadastrar = await Produtor.create({ email,nome,cpfCnpj,cep,rua,numero,bairro,cidade,estado,titular,tipoConta,banco,agencia,agenciaDig,conta,contaDig,chavePix,tipoChave})
                if(cadastrar?.id){
                    let cadastrarUser = await CadastrarUsuario(cadastrar.id,'',email,password?password:cpfCnpj,3)
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
        resposta = {msg:'Preencha o email e CPF/CNPJ!',error:true}
    }
    return resposta
}