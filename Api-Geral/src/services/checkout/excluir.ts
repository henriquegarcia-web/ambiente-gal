import { Checkout } from "../../models/checkout"
import { ApagarArquivo } from "../../utils/arquivo/apagar"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let idProdutor = user?.idConta
    let resposta:any
    if(idProdutor){
        let editar = await Checkout.findOne({where:{idProdutor,...(id && {id})}})
        if(editar?.id){
            await Checkout.destroy({where:{idProdutor,...(id && {id})}})
            await ApagarArquivo(`public/arquivo/${editar.imagem}`)
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}