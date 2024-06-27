import { Cupom } from "../../models/cupom"
import { Valida } from "./valida"

export const Cadastrar = async (body: any,user:any) => {
    let {  nome,tipo,valor, descricao  } = body
    let resposta: any
    let idProdutor = user?.idConta
    if (nome && tipo && valor && idProdutor) {
        let valida = await Valida(nome,idProdutor)
        if (valida) {
            let cadastrar = await Cupom.create({idProdutor, nome,tipo,valor, descricao  })
            if (cadastrar?.id) {
                resposta = { msg: 'Cadastro realizado com sucesso!', error: false,id:cadastrar.id }
            } else {
                resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
            }
        } else {
            resposta = { msg: 'Dados já cadastrados!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}