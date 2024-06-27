import { Op } from "sequelize"
import { Produtor } from "../../models/produtor"

export const Valida = async (email:string,id?:number) =>{
    let buscar = await Produtor.findAll({where:{...(id && {id:{[Op.ne]:id}}),email}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}