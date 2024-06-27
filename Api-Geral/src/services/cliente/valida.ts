import { Op } from "sequelize"
import { Cliente } from "../../models/cliente"

export const Valida = async (idProdutor:number,email?:any,id?:number) =>{
    let buscar = await Cliente.findAll({where:{idProdutor,...(id && {id:{[Op.ne]:id}}),[Op.or]:[{email}]}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}