import { Cliente } from "../../models/cliente"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null ,email=''} = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        let buscar = await Cliente.findAll({where:{idProdutor,...(id && {id}),...(email && {email})}})
        if(buscar?.length>0){
           resposta = {msg:'Dados encontrados!',error:false,list:buscar}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}