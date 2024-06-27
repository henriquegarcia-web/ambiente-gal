import { Checkout } from "../../models/checkout"

export const Imagem = async (nome:string,id:number) =>{
    await Checkout.update({imagem:nome},{where:{id}})
}