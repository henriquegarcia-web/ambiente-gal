import { Conteudo } from "../../models/conteudo"
import { ApagarArquivo } from "../../utils/arquivo/apagar"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let idProdutor = user?.idConta
    let resposta:any
    if(idProdutor){
        let editar = await Conteudo.findOne({where:{idProdutor,...(id && {id})}})
        if(editar?.id){
            await Conteudo.destroy({where:{idProdutor,...(id && {id})}})
            if(editar.imagem){
                await ApagarArquivo(`public/arquivo/${editar.imagem}`)
            }
            if(editar.video){
                await ApagarArquivo(`public/arquivo/${editar.video}`)
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