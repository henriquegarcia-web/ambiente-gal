import { Usuario } from "../../models/usuario";


export const ValidarToken =  async(body:any) =>{
  let {token} = body
  let resposta:any
  if(token){
    let buscar = await Usuario.findOne({where:{token}})
    if(buscar?.id){
      resposta = { msg: 'Token Validado!', error: false }
    }else{
      resposta = { msg: 'Token não Validado!', error: true }
    }
  }else{
    resposta = { msg: 'Preencha todos os dados!', error: true }
  }
  return resposta
}