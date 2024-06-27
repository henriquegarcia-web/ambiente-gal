import { Afiliacao } from "../../models/afiliacao"
import { Valida } from "./valida"

export const Editar = async (body: any,user:any) => {
    let { id,idProduto,status} = body
    let resposta: any
    if(id && idProduto){
        let valida = await Valida(idProduto,user.idConta)
        if(valida){
            let editar = await Afiliacao.findOne({ where: { id } })
            if (editar?.id) {
                Object.assign(editar, {status})
                await editar.save()
                resposta = { msg: 'Edição realizada com sucesso!', error: false }    
            } else {
                resposta = { msg: 'Item não encontrado!', error: true }
            }
        }else{
            resposta = { msg: 'Produtor não encontrado!', error: true }
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}