import { Modulo } from "../../models/modulo"
import { ApagarArquivo } from "../../utils/arquivo/apagar"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        let editar = await Modulo.findOne({where:{idProdutor,...(id && {id})}})
        if(editar?.id){
            if(editar.imagem){
                await ApagarArquivo(`public/arquivo/${editar.imagem}`)
            }
            await Modulo.destroy({where:{idProdutor,...(id && {id})}})
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}