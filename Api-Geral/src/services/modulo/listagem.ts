import { AreaMembro } from "../../models/areaMembro"
import { Curso } from "../../models/curso"
import { Modulo } from "../../models/modulo"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    if(idProdutor){
        Modulo.hasOne(Curso,{foreignKey:'id',sourceKey:'idCurso'})
        Curso.belongsTo(Modulo,{foreignKey:'id'})
    
        Curso.hasOne(AreaMembro,{foreignKey:'id',sourceKey:'idAreaMembro'})
        AreaMembro.belongsTo(Curso,{foreignKey:'id'})
    
        let buscar = await Modulo.findAll({where:{idProdutor,...(id && {id})},include:[{model:Curso,as:'curso',required:false,include:[{model:AreaMembro,as:'areaMembro',required:false}]}]})
        if(buscar?.length>0){
           resposta = {msg:'Dados encontrados!',error:false,list:buscar}
        }else{
            resposta = {msg:'Item não encontrado!',error:true,list:[]}
        }
    }else{
        resposta = {msg:'Item não encontrado!',error:true,list:[]}
    }
   
    return resposta
}