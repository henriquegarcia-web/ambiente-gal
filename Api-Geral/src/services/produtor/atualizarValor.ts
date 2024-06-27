import { Produtor } from "../../models/produtor"

export const AtualizarValor = async (body: any) => {
    let { id,valor} = body
    let resposta: any
    if(id  && valor ){
        let editar = await Produtor.findOne({ where: { id } })
        if (editar?.id) {
            editar.valor = (editar.valor) - parseFloat(valor)
            await editar.save()
            resposta = { msg: 'Edição realizada com sucesso!', error: true }    
        } else {
            resposta = { msg: 'Item não encontrado!', error: true }
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}