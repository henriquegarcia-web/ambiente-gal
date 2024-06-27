import { AreaMembro } from "../../models/areaMembro"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { v4 as uuidV4 } from "uuid"
import { Valida } from "./valida"
import { ValidaProduto } from "../checkout/validaProduto"
import { ValidaProdutor } from "../produtor/validaProdutor"

export const Cadastrar = async (bodys: any, file: any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { nome, descricao} = body
    let resposta: any
    let idProdutor = user?.idConta
    let validaProdutor = await ValidaProdutor(idProdutor)
    if(validaProdutor){
        if (nome && idProdutor) {
            let valida = await Valida(nome,idProdutor)
            if (valida) {
                let link = uuidV4()
                let cadastrar = await AreaMembro.create({idProdutor, nome, descricao,link })
                if (cadastrar?.id) {
                    if (file?.fieldname == 'imagem') {
                        let nome: any = await Arquivo(file)
                        if (nome) {
                            await Imagem(nome, cadastrar.id)
                        }
                    }
                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false ,id:cadastrar?.id,link}
                } else {
                    resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                }
            } else {
                resposta = { msg: 'Dados já cadastrados!', error: true }
            }
        } else {
            resposta = { msg: 'Preencha todos os dados!', error: true }
        }
    }else{
        resposta = { msg: 'Complete seu cadastro para poder utilizar essa funcionalidade!', error: true }  
    }
    
    return resposta
}