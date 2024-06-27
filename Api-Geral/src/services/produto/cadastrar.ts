import { Produto } from "../../models/produto"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { Tipos } from "./tipos"
import { Valida } from "./valida"

export const Cadastrar = async (bodys: any,file:any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { nome, descricao, preco, tipo,afiliacao,porcentagemAfialiacao,idAreaMembro } = body
    let resposta: any
    let idProdutor = user?.idConta
    if (nome && preco && tipo && idProdutor ) {
        let validaTipo = Tipos.filter((item)=>item.id== Number(tipo))
        if(validaTipo.length>0){
            let valida = await Valida(nome,idProdutor)
            if(valida){
                let cadastrar = await Produto.create({ idProdutor,nome, descricao, preco, tipo,afiliacao:afiliacao=='true'?true:false,porcentagemAfialiacao:porcentagemAfialiacao?porcentagemAfialiacao:0,idAreaMembro:idAreaMembro?idAreaMembro:0 })
                if (cadastrar?.id) {
                    if(file?.fieldname=='imagem'){
                        let nome:any = await Arquivo(file)
                        if(nome){
                            await Imagem(nome,cadastrar.id)
                        }
                    }
                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false ,id:cadastrar.id}
                } else {
                    resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                }
            }else{
                resposta = { msg: 'Dados já cadastrados!', error: true }
            }
        }else{
            resposta = { msg: 'Tipo inválido!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}