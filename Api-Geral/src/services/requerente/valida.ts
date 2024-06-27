import { Requerente } from "../../models/requerente"

export const Valida = async () => {
    let resposta: any
    let buscar = await Requerente.findOne({ where: { status: true } })
    if (buscar?.id) {
        resposta = { msg: 'Dados encontrados!', error: false, list: buscar }
    } else {
        resposta = { msg: 'Item não encontrado!', error: true }
    }

    return resposta
}