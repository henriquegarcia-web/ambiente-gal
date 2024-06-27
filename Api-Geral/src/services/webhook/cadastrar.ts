import { ValidaProdutor } from "../produtor/validaProdutor"
import { Webhook } from "../../models/webhook"

export const Cadastrar = async (body: any, file: any, user: any) => {
    let { nome, url, evento } = body
    let resposta: any
    let idProdutor = user?.idConta
 
    let validaProdutor = await ValidaProdutor(idProdutor)
    if (validaProdutor) {
        if (url && evento) {
            let cadastrar = await Webhook.create({ idProdutor, nome, url, evento })
            if (cadastrar?.id) {
                resposta = { msg: 'Cadastro realizado com sucesso!', error: false, id: cadastrar.id }
            } else {
                resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
            }
        } else {
            resposta = { msg: 'Preencha todos os dados!', error: true }
        }
    } else {
        resposta = { msg: 'Complete seu cadastro para poder utilizar essa funcionalidade!', error: true }
    }
    return resposta
}