import { VendaProdutos } from "../../models/vendaProdutos"

export const Listagem = async (idVenda:any) =>{
    let buscar = await VendaProdutos.findAll({where:{idVenda}})
    return buscar
}