
import { genereteToken } from "../../config/passport"
import { Usuario } from "../../models/usuario"
import { Listagem } from "../produtor/listagem"
import { ValiarPassword } from "./validarPassword"
import { Listagem as ListagemVendas } from "../venda/listagem"
import { ListagemVendasCliente } from "../venda/listagemVendasCliente"

export const login = async (body: any) => {
    let { email, password, link } = body
    let resposta = { msg: '', error: false, user: {} }
    if (email) {
        let buscar = await Usuario.findOne({ where: { email } })
        if (buscar?.id) {
            let valida: any = await ValiarPassword(password, buscar.password)
            if (valida) {
                let produtor = await Listagem({ id: buscar.idConta })
                let user = { id: buscar.id, idConta: buscar.idConta, nome: buscar.nome, email: buscar.email, permissao: buscar.permissao, foto: buscar.foto }
                let token = genereteToken(user)
                let venda = buscar.permissao == 2 ? await ListagemVendasCliente({ idCliente: buscar.idConta }) : []
                if(link){
                  
                    if (venda.list.links.some((item: any) => item == link)) {
                        Object.assign(resposta, { msg: 'Senha e email validados!', error: false })
                        Object.assign(resposta.user, { token: token, id: user.id, idConta: user.idConta, nome: user.nome, email: user.email, permissao: user.permissao, foto: user.foto })
                    } else {
                        Object.assign(resposta, { msg: 'Senha e/ou email incorretos!', error: true })
                    }

                }else{
                    Object.assign(resposta, { msg: 'Senha e email validados!', error: false })
                    Object.assign(resposta.user, { token: token, id: user.id, idConta: user.idConta, nome: user.nome, email: user.email, permissao: user.permissao, foto: user.foto, produtor: produtor?.list?.length > 0 ? produtor.list[0] : {} })
                }
               

            } else {
                Object.assign(resposta, { msg: 'Senha e/ou email incorretos!', error: true })
            }
        } else {
            Object.assign(resposta, { msg: 'Senha e/ou email incorretos!', error: true })
        }
    } else {
        Object.assign(resposta, { msg: 'Email não enviado!', error: true })
    }
    return resposta
}