import { Webhook } from "../../models/webhook"
import { Valida } from "./valida"

export const Editar = async (body: any, file: any, user: any) => {
    let { id, nome, url, evento } = body
    let resposta: any
    let idProdutor = user?.idConta
    if (id && nome && url && evento) {
        let valida = await Valida(nome, id)
        if (valida) {
            let editar = await Webhook.findOne({ where: { idProdutor, id } })
            if (editar?.id) {
                Object.assign(editar, { nome,url,evento})
                await editar.save()
                resposta = { msg: 'Edição realizada com sucesso!', error: false }
            } else {
                resposta = { msg: 'Item não encontrado!', error: true }
            }
        } else {
            resposta = { msg: 'Dados já cadastro!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}