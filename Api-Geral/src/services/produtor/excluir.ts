import { Produtor } from "../../models/produtor"
import { ExcluirUsuario } from "../usuario/excluir"
import { Excluir as ExcluirAfialicao } from "../afiliacao/excluir"
import { Excluir as ExcluirArea } from "../areaMembro/excluir"
import { Excluir as ExcluirCheckout } from "../checkout/excluir"
import { Excluir as ExcluirCliente } from "../cliente/excluir"
import { Excluir as ExcluirConteudo } from "../conteudo/excluir"
import { Excluir as ExcluirCupom } from "../cupom/excluir"
import { Excluir as ExcluirCurso } from "../curso/excluir"
import { Excluir as ExcluirModulo } from "../modulo/excluir"
import { Excluir as ExcluirPixel } from "../pixel/excluir"
import { Excluir as ExcluirProduto } from "../produto/excluir"

export const Excluir = async (body:any) =>{
    let {id} = body
    let resposta:any
    if(id){
        let editar = await Produtor.findOne({where:{id}})
        if(editar?.id){
            await ExcluirUsuario(editar.id,3)
            await editar.destroy()
            await ExcluirAfialicao({id:''},{idConta:id})
            await ExcluirArea({id:''},{idConta:id})
            await ExcluirCheckout({id:''},{idConta:id})
            await ExcluirCliente({id:''},{idConta:id})
            await ExcluirConteudo({id:''},{idConta:id})
            await ExcluirCupom({id:''},{idConta:id})
            await ExcluirCurso({id:''},{idConta:id})
            await ExcluirModulo({id:''},{idConta:id})
            await ExcluirPixel({id:''},{idConta:id})
            await ExcluirProduto({id:''},{idConta:id})
           resposta = {msg:'Exclusão realizada com sucesso!',error:false}
        }else{
            resposta = {msg:'Item não encontrado!',error:true}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    
    return resposta
}