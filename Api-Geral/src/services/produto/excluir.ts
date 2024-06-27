import { Produto } from "../../models/produto"
import { ApagarArquivo } from "../../utils/arquivo/apagar"

export const Excluir = async (body:any,user:any) =>{
    let {id} = body
    let resposta:any
    let idProdutor = user?.idConta
    if(id && idProdutor){
        let editar = await Produto.findOne({where:{idProdutor,id}})
        if(editar?.id){
            if(editar.imagem){
                await ApagarArquivo(`public/arquivo/${editar.imagem}`)
            }
            await Produto.destroy({where:{idProdutor,...(id && {id})}})
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}