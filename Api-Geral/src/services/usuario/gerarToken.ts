import { EnviarToken } from "../../integration/email";
import { Usuario } from "../../models/usuario";
import { ValidarEmail } from "./validarEmail";


export const Token = async () =>{
    let token = '';
    for (let i = 0; i < 4; i++) {
      token += Math.floor(Math.random() * 10);
    }
    return token;
}
export const GerarToken =  async(body:any) =>{
  let {email} = body
  let resposta:any
  let token = await Token()
  if(email){
    let validarEmail = await ValidarEmail(email)
    if(!validarEmail){
      await Usuario.update({token:token},{where:{email}})
      await EnviarToken(email,token)
      resposta = { msg: 'Token enviado!', error: false }
    }else{
      resposta = { msg: 'Email não encontrado!', error: true }
    }
  }else{
    resposta = { msg: 'Preencha todos os dados!', error: true }
  }
  return resposta
}