import { Pixel } from "../../models/pixel"
import { Produtor } from "../../models/produtor"
import { Transacao } from "../../models/transacao"

export const Listagem = async (user: any, params?: any) => {
    let { id = null } = params ?? {}
    let resposta: any
    let idProdutor = user.permissao!=3?null: user?.idConta
    Transacao.hasOne(Produtor,{foreignKey:'id',sourceKey:'idProdutor'})
    Produtor.belongsTo(Transacao,{foreignKey:'id'})

    let buscar = await Transacao.findAll({ where: { ...(idProdutor && {idProdutor}), ...(id && { id }) } ,include:[{model:Produtor,as:'produtor',required:true}]})
    if (buscar?.length > 0) {
        resposta = { msg: 'Dados encontrados!', error: false, list: buscar }
    } else {
        resposta = { msg: 'Item não encontrado!', error: false, list: buscar  }
    }
    return resposta
}


