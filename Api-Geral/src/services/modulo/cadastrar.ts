import { Curso } from "../../models/curso"
import { Modulo } from "../../models/modulo"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { Valida } from "./valida"
import { ValidaCurso } from "./validaCurso"

export const Cadastrar = async (bodys: any, file: any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { idCurso, nome, descricao  } = body
    let resposta: any
    let idProdutor = user?.idConta
    if (idCurso && nome  && idProdutor) {
        let validaCurso = await ValidaCurso(idCurso,idProdutor)
        if(validaCurso){
            let valida = await Valida(nome,idProdutor)
            if (valida) {
                let cadastrar = await Modulo.create({ idProdutor,idCurso,nome, descricao })
                if (cadastrar?.id) {
                    if (file?.fieldname == 'imagem') {
                        let nome: any = await Arquivo(file)
                        if (nome) {
                            await Imagem(nome, cadastrar.id)
                        }
                    }
                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false ,id:cadastrar.id}
                } else {
                    resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                }
            } else {
                resposta = { msg: 'Dados já cadastrados!', error: true }
            }
        }else{
            resposta = { msg: 'Permissão de curso negada!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}