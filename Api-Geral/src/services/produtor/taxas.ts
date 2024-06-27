import { Produtor } from "../../models/produtor"

export const Taxas = async (body: any) => {
    let { id,taxaFixa,taxaVariavel,saque,taxaRetido} = body
    let resposta: any
    if(id){
        let editar = await Produtor.findOne({ where: { id } })
        if (editar?.id) {
            Object.assign(editar, {taxaFixa,taxaVariavel,saque,taxaRetido})
            await editar.save()
            resposta = { msg: 'Edição realizada com sucesso!', error: false }    
        } else {
            resposta = { msg: 'Item não encontrado!', error: true }
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}