import { Venda } from "../../models/venda"
import { Excluir as Exit } from "../cliente/excluir"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let idProdutor = user?.idConta
    let resposta:any
    if(id && idProdutor){
        let editar = await Venda.findOne({where:{idProdutor,id}})
        if(editar?.id){
            await Exit({idVenda:editar?.id},{idConta:idProdutor})
            await editar.destroy()
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}