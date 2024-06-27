import { Produtor } from "../../models/produtor"

export const Listagem = async (params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
 
    let buscar = await Produtor.findAll({where:{...(id && {id})}})
    if(buscar?.length>0){
       resposta = {msg:'Dados encontrados!',error:true,list:buscar}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}