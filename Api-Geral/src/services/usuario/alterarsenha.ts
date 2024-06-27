import { Usuario } from "../../models/usuario";
import { GeneretePassword } from "./generetePassword";
import { ValidarToken } from "./validarToken";


export const AlterarSenha =  async(body:any) =>{
  let {email,token,password} = body
  let resposta:any
  if(token){
    let buscar =await ValidarToken({token})
    if(!buscar?.error){
      let passwordHash = await GeneretePassword(password)
      await Usuario.update({token:'',password:passwordHash},{where:{token,email}})
      resposta = { msg: 'Senha alterada!', error: false }
    }else{
      resposta = { msg: 'Token não Validado!', error: true }
    }
  }else{
    resposta = { msg: 'Preencha todos os dados!', error: true }
  }
  return resposta
}