import { Produtor } from "../../models/produtor"

export const ValidaProdutor = async (id:number) =>{
    let obj = await Produtor.findOne({where:{id}})
    if (obj?.validar) {
        return true
    } else {
        return false
    }
}