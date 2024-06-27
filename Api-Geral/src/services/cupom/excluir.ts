import { Cupom } from "../../models/cupom"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let idProdutor = user?.idConta
    let resposta:any
    if(idProdutor){
        let editar = await Cupom.findOne({where:{idProdutor,...(id && {id})}})
        if(editar?.id){
            await Cupom.destroy({where:{idProdutor,...(id && {id})}})
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}