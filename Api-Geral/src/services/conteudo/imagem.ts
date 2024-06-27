import { Conteudo } from "../../models/conteudo"

export const Imagem = async (nome:string,id:number) =>{
    await Conteudo.update({imagem:nome},{where:{id}})
}
export const Video = async (nome:string,id:number) =>{
    await Conteudo.update({video:nome},{where:{id}})
}
export const Materiais1 = async (nome:string,id:number) =>{
    await Conteudo.update({materiais1:nome},{where:{id}})
}
export const Materiais2 = async (nome:string,id:number) =>{
    await Conteudo.update({materiais2:nome},{where:{id}})
}