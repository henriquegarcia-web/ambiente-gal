import { Curso } from "../../models/curso"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { Valida } from "./valida"
import { ValidaAreaMembro } from "./validaAreaMembro"

export const Cadastrar = async (bodys: any, file: any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { idAreaMembro, nome, descricao  } = body
    let resposta: any
    let idProdutor = user?.idConta
    if (nome && idAreaMembro && idProdutor) {
        let validaAreaMembro = await ValidaAreaMembro(idAreaMembro,idProdutor)
        if(validaAreaMembro){
            let valida = await Valida(nome,idProdutor)
            if (valida) {
                let cadastrar = await Curso.create({ idProdutor,idAreaMembro,nome, descricao })
                if (cadastrar?.id) {
                    if (file?.fieldname == 'imagem') {
                        let nome: any = await Arquivo(file)
                        if (nome) {
                            await Imagem(nome, cadastrar.id)
                        }
                    }
                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false,id:cadastrar?.id }
                } else {
                    resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                }
            } else {
                resposta = { msg: 'Dados já cadastrados!', error: true }
            }
        }else{
            resposta = { msg: 'Permissão da área de membros negada!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}