import { Pixel } from "../../models/pixel"
import { Valida } from "./valida"

export const Editar = async (body: any,user:any) => {
    let { id,  nome,idPixel,api, descricao,tipo,plataforma } = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id && nome  && idProdutor ){
        let valida = await Valida(nome,idProdutor,id)
        if(valida){
            let editar = await Pixel.findOne({ where: { idProdutor,id } })
            if (editar?.id) {
                Object.assign(editar, {  nome,idPixel,api, descricao,tipo,plataforma })
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