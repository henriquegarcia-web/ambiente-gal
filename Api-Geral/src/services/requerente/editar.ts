import { Op } from "sequelize"
import { Cliente } from "../../models/cliente"
import { Requerente } from "../../models/requerente"

export const Editar = async (body: any,user:any) => {
    let { id,status} = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id  && !idProdutor){
        let editar = await Requerente.findOne({ where: { id } })
        if (editar?.id) {
            Object.assign(editar, {status})
            await editar.save()
            await Requerente.update({status:!status},{where:{id:{[Op.ne]:id}}})
            resposta = { msg: 'Edição realizada com sucesso!', error: false }    
        } else {
            resposta = { msg: 'Item não encontrado!', error: true }
        }
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}