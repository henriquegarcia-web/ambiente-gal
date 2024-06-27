import { Cliente } from "../../models/cliente"
import { Valida } from "./valida"

export const Editar = async (body: any,user:any) => {
    let { id,nome,cpfCnpj,cep,rua,numero,bairro,cidade,estado} = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id && cpfCnpj && idProdutor){
        let valida = await Valida(idProdutor,'',id)
        if(valida){
            let editar = await Cliente.findOne({ where: { id } })
            if (editar?.id) {
                Object.assign(editar, {idProdutor,nome,cpfCnpj,cep,rua,numero,bairro,cidade,estado})
                await editar.save()
                resposta = { msg: 'Edição realizada com sucesso!', error: false }    
            } else {
                resposta = { msg: 'Item não encontrado!', error: true }
            }
        }else{
            resposta = {msg:'Dados já utlizados!',error:true} 
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}