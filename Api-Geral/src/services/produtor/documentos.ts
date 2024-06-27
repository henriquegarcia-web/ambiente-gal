
import { Produtor } from "../../models/produtor"

export const DocsversoIdentidade = async (nome:string,id:number) =>{
    await Produtor.update({versoIdentidade:nome},{where:{id}})
}
export const DocsfrenteIdentidade = async (nome:string,id:number) =>{
    await Produtor.update({frenteIdentidade:nome},{where:{id}})
}
export const DocscartaoCNPJ = async (nome:string,id:number) =>{
    await Produtor.update({cartaoCNPJ:nome},{where:{id}})
}
export const DocsselfieDocumento = async (nome:string,id:number) =>{
    await Produtor.update({selfieDocumento:nome},{where:{id}})
}