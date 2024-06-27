import { Usuario } from "../../models/usuario"

export const EditarDetalhes = async (body:any,user:any) =>{
    let {id,nome,permissao}:any = body
    const permissoesPermitidas:any = {1: true,4: true,5: true};
    if(id ){
            let usuario = await Usuario.findOne({where:{id}})
            if(usuario?.id){
                usuario.nome = nome
                if( permissoesPermitidas[permissao]){
                    usuario.permissao = permissao
                }
               await usuario.save()
               return {msg:'Dados atualizados!',error:false}
            }else{
                return {msg:'Erro encontrado, tente novamente mais tarde!',error:true}
            }
    }else{
        return {msg:'Erro encontrado, tente novamente mais tarde!',error:true}
    }
    
}