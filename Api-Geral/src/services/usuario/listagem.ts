import { Op } from "sequelize"
import { Usuario } from "../../models/usuario"

export const Listagem = async (params: any, user: any) => {

    let { id = null } = params ?? {}
    let resposta: any
    let buscar = await Usuario.findAll({ attributes: ['id', 'nome', 'email', 'permissao'], where: { id: { [Op.ne]: user?.id }, ...(id && { id }), [Op.or]: [{ permissao: 1 }, { permissao: 4 }, { permissao: 5 }] } })
    if (buscar?.length > 0) {
        resposta = { msg: 'Dados encontrados!', error: true, list: buscar }
    } else {
        resposta = { msg: 'Unidade não encontrada!', error: true }
    }
    return resposta

}