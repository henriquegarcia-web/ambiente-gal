import { Cliente } from "../../models/cliente"
import { Requerente } from "../../models/requerente"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null , status=null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    if(!idProdutor){
        let buscar = await Requerente.findAll({where:{...(id && {id}),...(status==1 && {status:true})}})
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