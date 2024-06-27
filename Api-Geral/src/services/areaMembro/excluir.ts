import { AreaMembro } from "../../models/areaMembro"
import { ApagarArquivo } from "../../utils/arquivo/apagar"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        let editar = await AreaMembro.findOne({where:{idProdutor,...(id && {id})}})
        if(editar?.id){
            await AreaMembro.destroy({where:{idProdutor,...(id && {id})}})
            if(editar.imagem){
                await ApagarArquivo(`public/arquivo/${editar.imagem}`)
            }
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}