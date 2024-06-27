import { Afiliacao } from "../../models/afiliacao"
import { Listagem } from "../produto/listagem"
import { Valida } from "./valida"

export const Cadastrar = async (body: any,user:any) => {
    let { idProduto } = body
    let resposta: any
    let listagem = await Listagem({id:idProduto})
    let idProdutor = listagem?.list[0]?.idProdutor
    if (idProduto  && idProdutor) {
        if(idProdutor != user.idConta){
            let valida = await Valida( idProduto, user.idConta)
            if(valida){
                let cadastrar = await Afiliacao.create({ idProduto, idProdutor:user.idConta })
                if (cadastrar?.id) {
                    resposta = { msg: 'Afiliação solicitada!', error: false }
                } else {
                    resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                }
            }else{
                resposta = { msg: 'Afiliação já solicitada!', error: true }
            }
        }else{
            resposta = { msg: 'Error, tente novamente mais tarde!', error: true}
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}