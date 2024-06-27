import { Op } from "sequelize"
import { AreaMembro } from "../../models/areaMembro"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await AreaMembro.findAll({where:{...(id && {id:{[Op.ne]:id}}),idProdutor,nome}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}