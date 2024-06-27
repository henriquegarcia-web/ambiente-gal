import { AreaMembro } from "../../models/areaMembro"
import { Conteudo } from "../../models/conteudo"
import { Curso } from "../../models/curso"
import { Modulo } from "../../models/modulo"

export const Listagem = async (user: any, params?: any) => {
    let { id = null, link = null } = params ?? {}
    let resposta: any
    let idProdutor = user?.idConta
    AreaMembro.hasMany(Curso, { foreignKey: 'idAreaMembro' })
    Curso.belongsTo(AreaMembro, { foreignKey: 'id' })

    Curso.hasMany(Modulo, { foreignKey: 'idCurso' })
    Modulo.belongsTo(Curso, { foreignKey: 'id' })

    Modulo.hasMany(Conteudo, { foreignKey: 'idModulo' })
    Conteudo.belongsTo(Modulo, { foreignKey: 'id' })

    let buscar = await AreaMembro.findAll({ where: { ...(id && { id }),...(idProdutor && {idProdutor}), ...(link && { link })}, include: [{ model: Curso, as: 'cursos', required: false, include: [{ model: Modulo, as: 'modulos', required: false, include: [{ model: Conteudo, as: 'conteudos', required: false }] }] }] })
    if (buscar?.length > 0) {
        resposta = { msg: 'Dados encontrados!', error: false, list: buscar }
    } else {
        resposta = { msg: 'Item não encontrado!', error: true ,list:[]}
    }
    return resposta
}