import { Modulo } from "../../models/modulo"
import { ApagarArquivo } from "../../utils/arquivo/apagar"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { Valida } from "./valida"

export const Editar = async (bodys: any,file:any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let { id,idCurso, nome, descricao} = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id && idCurso && nome && idProdutor  ){
        let valida = await Valida(nome,idProdutor,id)
        if(valida){
            let editar = await Modulo.findOne({ where: {idProdutor, id } })
            if (editar?.id) {
                Object.assign(editar, {idCurso,nome, descricao})
                if(file?.fieldname=='imagem'){
                    let nome:any = await Arquivo(file)
                    if(nome){
                        await ApagarArquivo(`public/arquivo/${editar.imagem}`)
                        await Imagem(nome,editar.id)
                    }
                }
                await editar.save()
                resposta = { msg: 'Edição realizada com sucesso!', error: false}    
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