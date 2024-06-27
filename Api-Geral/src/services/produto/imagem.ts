import { Produto } from "../../models/produto"

export const Imagem = async (nome:string,id:number) =>{
    await Produto.update({imagem:nome},{where:{id}})
}