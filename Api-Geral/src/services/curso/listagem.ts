import { AreaMembro } from "../../models/areaMembro"
import { Curso } from "../../models/curso"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        Curso.hasOne(AreaMembro,{foreignKey:'id',sourceKey:'idAreaMembro'})
        AreaMembro.belongsTo(Curso,{foreignKey:'id'})
        let buscar = await Curso.findAll({where:{idProdutor,...(id && {id})},include:[{model:AreaMembro,as:'areaMembro',required:false}]})
        if(buscar?.length>0){
            resposta = {msg:'Dados encontrados!',error:true,list:buscar}
        }else{
            resposta = {msg:'Item não encontrado!',error:true,list:[]}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true,list:[]}
    }
    
    return resposta
}