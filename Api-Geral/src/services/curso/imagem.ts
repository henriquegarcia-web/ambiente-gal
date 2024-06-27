import { Curso } from "../../models/curso"

export const Imagem = async (nome:string,id:number) =>{
    await Curso.update({imagem:nome},{where:{id}})
}