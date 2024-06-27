import { Afiliacao } from "../../models/afiliacao"

export const Valida = async (idProduto:string,idProdutor:string) =>{
    let buscar = await Afiliacao.findAll({where:{idProduto,idProdutor}})
    if(buscar?.length==0){
       return true
    }else{
        return false
    }
}