import { Pixel } from "../../models/pixel"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        let buscar = await Pixel.findAll({where:{idProdutor,...(id && {id})}})
        if(buscar?.length>0){
           resposta = {msg:'Dados encontrados!',error:false,list:buscar}
        }else{
            resposta = {msg:'Item não encontrado!',error:true,list:[]}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true,list:[]}
    }
    
    return resposta
}