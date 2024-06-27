import { Transacao } from "../../models/transacao"
import { Times } from "../../utils/time"
import { Listagem } from "../produtor/listagem"
import { Valida } from "./valida"
export const Cadastrar = async (body: any, user: any) => {
    let { valor,tipoValor } = body
    let resposta: any
    let idProdutor = user?.idConta
    let time = await Times()
    let listagemprodutor = await Listagem({ id: idProdutor })
    let validar = await Valida(idProdutor)

    if(validar){
        if (parseFloat(valor) >= 50) {
            if (tipoValor==1? listagemprodutor.list[0].saldoDisponivel >= parseFloat(valor): listagemprodutor.list[0].valorRetido >= parseFloat(valor)) {
                if (valor && idProdutor) {
                    let cadastrar = await Transacao.create({tipoValor,saldoDisponivel:listagemprodutor.list[0].saldoDisponivel,saldoRetido:listagemprodutor.list[0].valorRetido, idProdutor, valor:(parseFloat(valor)),valorLiquido:(parseFloat(valor)-4.99),taxa:4.99, data: time.data, hora: time.hora, status: 1 })
                    if (cadastrar?.id) {
                        resposta = { msg: 'Solicitação realizada com sucesso!', error: false, id: cadastrar.id, data: time.data,saldoDisponivel:listagemprodutor.list[0].saldoDisponivel,saldoRetido:listagemprodutor.list[0].valorRetido,hora: time.hora,valorLiquido:(parseFloat(valor)-4.99) ,taxa:4.99}
                    } else {
                        resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                    }
                } else {
                    resposta = { msg: 'Preencha todos os dados!', error: true }
                }
            } else {
                resposta = { msg: 'Saldo indisponivel!', error: true }
            }
        } else {
            resposta = { msg: 'Valor tem que ser superior a R$ 50,00!', error: true }
        }
    }else{
        resposta = { msg: 'Solicitação de saque pendente!', error: true }
    }
    

    return resposta
}