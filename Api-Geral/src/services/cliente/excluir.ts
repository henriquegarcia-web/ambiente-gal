import { Cliente } from "../../models/cliente"
import { ExcluirUsuario } from "../usuario/excluir"

export const Excluir = async (body:any,user:any) =>{
    let {id,idVenda=null} = body
    let resposta:any
    let idProdutor = user?.idConta
    if((id || idVenda ) && idProdutor){
        let editar = await Cliente.findOne({where:{idProdutor,...(id && {id}),...(idVenda && {idVenda}) }})
        if(editar?.id){
            await Cliente.destroy({where:{idProdutor,...(id && {id}),...(idVenda && {idVenda}) }})
            await ExcluirUsuario(editar.id,2)
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}