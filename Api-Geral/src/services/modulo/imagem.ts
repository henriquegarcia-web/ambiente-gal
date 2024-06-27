import { Modulo } from "../../models/modulo"

export const Imagem = async (nome:string,id:number) =>{
    await Modulo.update({imagem:nome},{where:{id}})
}