import { Op } from "sequelize"
import { Transacao } from "../../models/transacao"

export const Valida = async (idProdutor:number) =>{
    let buscar = await Transacao.findAll({where:{idProdutor,status:1}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}