import { Venda } from "../../models/venda"

export const ValidaVenda = async (id:number) =>{
    let buscar = await Venda.findOne({where:{id:id}})
    if(buscar?.id){
        return buscar.compensacao?false:true
    }else{
        return false
    }
}