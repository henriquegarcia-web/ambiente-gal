import { Afiliacao } from "../../models/afiliacao"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        let editar = await Afiliacao.findOne({where:{idProdutor,...(id && {id})}})
        if(editar?.id){
            await Afiliacao.destroy({where:{idProdutor,...(id && {id})}})
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}