import { CadastrarUsuario } from "./cadastrar"
import { ValidarEmail } from "./validarEmail"

export const Cadastrar = async (body:any) =>{
    let {nome,email,permissao,password} = body
    const permissoesPermitidas:any = {1: true,4: true,5: true};
    let resposta:any
    if(email && permissao && password){
        let validaUser = await ValidarEmail(email)
        if(permissoesPermitidas[permissao]){
            if(validaUser){
                let cadastrarUser = await CadastrarUsuario(0,nome,email,password,permissao)
                if(cadastrarUser.id){
                    resposta = {msg:'Cadastro realizado com sucesso!',error:false,id:cadastrarUser.id}
                }else{
                    resposta = {msg:'Error, tente novamente mais tarde!',error:true}
                }
            }else{
                resposta = {msg:'Email já utilizado!',error:true}
            }
        }else{
            resposta = {msg:'Permissão não permitida!',error:true}
        }
    }else{
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}