import { Venda } from "../../models/venda"
import { Excluir as Exit } from "../cliente/excluir"

export const Cancelar = async (body:any,user:any) =>{
    let {id} = body
    let resposta:any
    if(id ){
       
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}