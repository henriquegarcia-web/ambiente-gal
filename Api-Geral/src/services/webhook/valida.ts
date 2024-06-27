import { Op } from "sequelize"
import { Webhook } from "../../models/webhook"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await Webhook.findAll({where:{...(id && {id:{[Op.ne]:id}}),nome,idProdutor}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}