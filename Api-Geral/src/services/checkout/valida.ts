import { Op } from "sequelize"
import { Checkout } from "../../models/checkout"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await Checkout.findAll({where:{...(id && {id:{[Op.ne]:id}}),nome,idProdutor}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}