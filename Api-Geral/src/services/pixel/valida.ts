import { Op } from "sequelize"
import { Pixel } from "../../models/pixel"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await Pixel.findAll({where:{idProdutor,...(id && {id:{[Op.ne]:id}}),nome}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}