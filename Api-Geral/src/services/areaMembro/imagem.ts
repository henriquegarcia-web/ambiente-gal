import { AreaMembro } from "../../models/areaMembro"

export const Imagem = async (nome:string,id:number) =>{
    await AreaMembro.update({imagem:nome},{where:{id}})
}