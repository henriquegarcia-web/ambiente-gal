import { Conteudo } from "../../models/conteudo"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem, Video,Materiais1,Materiais2 } from "./imagem"
import { Valida } from "./valida"
import { ValidaModulo } from "./validaModulo"

export const Cadastrar = async (bodys: any, file: any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { idModulo, nome, descricao  ,descricao1,descricao2} = body
    let resposta: any
    let idProdutor = user?.idConta
    if (idModulo  && nome  && file.video && idProdutor) {
        let validaModulo = await ValidaModulo(idModulo,idProdutor)
        if(validaModulo){
            let valida = await Valida(nome,idProdutor)
            if (valida) {
                let cadastrar = await Conteudo.create({ idProdutor,idModulo,nome, descricao,descricao1,descricao2 })
                if (cadastrar?.id) {
                    if (file.video && file.video[0] ) {
                        let nome: any = await Arquivo(file.video[0])
                        if (nome) {
                            await Video(nome, cadastrar.id)
                        }
                    }
                    if (file.imagem && file.imagem[0]) {
                        let nome: any = await Arquivo(file.imagem[0])
                        if (nome) {
                            await Imagem(nome, cadastrar.id)
                        }
                    }
                    if (file.materiais1 && file.materiais1[0]) {
                        let nome: any = await Arquivo(file.materiais1[0])
                        if (nome) {
                            await Materiais1(nome, cadastrar.id)
                        }
                    }
                    if (file.materiais2 && file.materiais2[0]) {
                        let nome: any = await Arquivo(file.materiais2[0])
                        if (nome) {
                            await Materiais2(nome, cadastrar.id)
                        }
                    }
                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false,id:cadastrar.id }
                } else {
                    resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                }
            } else {
                resposta = { msg: 'Dados já cadastrados!', error: true }
            }
        }else{
            resposta = { msg: 'Permissão negada!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}