import { Op } from "sequelize"
import { Curso } from "../../models/curso"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await Curso.findAll({where:{idProdutor,...(id && {id:{[Op.ne]:id}}),nome}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}