import { Cupom } from "../../models/cupom"
import { Tipos } from "./tipos"

export const Listagem = async (user: any, params?: any) => {
    let { id = null,nome='' } = params ?? {}
    let resposta: any
    let idProdutor = user?.idConta
    let buscar = await Cupom.findAll({ where: { ...(idProdutor && {idProdutor}),...(nome && {nome}), ...(id && { id }) } })
    if (buscar?.length > 0) {
        let listagem = buscar.map((item) => { return { id: item.id, nome: item.nome, valor: item.valor, tipo: Tipos.find((type) => type.id == Number(item.tipo))?.id } })
        resposta = { msg: 'Dados encontrados!', error: false, list: listagem }
    } else {
        resposta = { msg: 'Item não encontrado!', error: true, list: [] }
    }

    return resposta
}