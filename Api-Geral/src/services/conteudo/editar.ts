import { Conteudo } from "../../models/conteudo"
import { ApagarArquivo } from "../../utils/arquivo/apagar"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem, Video,Materiais1,Materiais2 } from "./imagem"
import { Valida } from "./valida"

export const Editar = async (bodys: any,file:any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { id,idModulo, nome, descricao ,descricao1,descricao2} = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id && idModulo && nome  && idProdutor){
        let valida = await Valida(nome,idProdutor,id)
        if(valida){
            let editar = await Conteudo.findOne({ where: { idProdutor,id } })
            if (editar?.id) {
                Object.assign(editar, {idModulo,nome, descricao,descricao1,descricao2})
                if (file?.video && file?.video[0] ) {
                    let nome: any = await Arquivo(file.video[0])
                    if (nome) {
                        await ApagarArquivo(`public/arquivo/${editar.video}`)
                        await Video(nome, editar.id)
                    }
                }
                if (file?.imagem && file?.imagem[0]) {
                    let nome: any = await Arquivo(file.imagem[0])
                    if (nome) {
                        await ApagarArquivo(`public/arquivo/${editar.imagem}`)
                        await Imagem(nome, editar.id)
                    }
                }
                if (file?.materiais1 && file?.materiais1[0]) {
                    let nome: any = await Arquivo(file.materiais1[0])
                    if (nome) {
                        await ApagarArquivo(`public/arquivo/${editar.materiais1}`)
                        await Materiais1(nome, editar.id)
                    }
                }
                if (file?.materiais2 && file?.materiais2[0]) {
                    let nome: any = await Arquivo(file.materiais2[0])
                    if (nome) {
                        await ApagarArquivo(`public/arquivo/${editar.materiais2}`)
                        await Materiais2(nome, editar.id)
                    }
                }
                await editar.save()
                resposta = { msg: 'Edição realizada com sucesso!', error: false }    
            } else {
                resposta = { msg: 'Item não encontrado!', error: true }
            }
        }else{
            resposta = { msg: 'Dados já cadastro!', error: true }
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}