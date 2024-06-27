import { Op } from "sequelize"
import { Cupom } from "../../models/cupom"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await Cupom.findAll({where:{idProdutor,...(id && {id:{[Op.ne]:id}}),nome}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}