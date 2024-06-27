import { Op } from "sequelize"
import { Produto } from "../../models/produto"

export const Valida = async (nome:string,idProdutor:number,id?:number) =>{
    let buscar = await Produto.findAll({where:{idProdutor,...(id && {id:{[Op.ne]:id}}),nome}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}