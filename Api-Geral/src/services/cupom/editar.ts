import { Cupom } from "../../models/cupom"
import { Valida } from "./valida"

export const Editar = async (body: any,user:any) => {
    let { id, nome,tipo,valor, descricao} = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id && nome && tipo && valor && idProdutor  ){
        let valida = await Valida(nome,idProdutor,id)
        if(valida){
            let editar = await Cupom.findOne({ where: { idProdutor,id } })
            if (editar?.id) {
                Object.assign(editar, { nome,tipo,valor, descricao})
                await editar.save()
                resposta = { msg: 'Edição realizada com sucesso!', error: false }    
            } else {
                resposta = { msg: 'Item não encontrado!', error: true }
            }
        }else{
            resposta = { msg: 'Dados já cadastro!', error: true }
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}