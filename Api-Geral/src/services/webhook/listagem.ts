import { Tipos } from "./tipos"
import { Webhook } from "../../models/webhook"
export const Listagem = async (user:any,params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    let buscar = await Webhook.findAll({where:{...(idProdutor && {idProdutor}),...(id && {id})}})
    if(buscar?.length>0){
        idProdutor = buscar[0].idProdutor
        let listagem = buscar.map((item:any)=>{return {id:item.id,nome:item.nome,url:item.url,evento:Tipos?.filter((type)=> item?.evento?.split('-').includes(String(type.id)))}})
        resposta = {msg:'Dados encontrados!',error:false,list:listagem}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}