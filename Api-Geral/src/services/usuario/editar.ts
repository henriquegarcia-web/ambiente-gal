import { Usuario } from "../../models/usuario"
import { ApagarArquivo } from "../../utils/arquivo/apagar"
import { Arquivo } from "../../utils/arquivo/criar"
import { GeneretePassword } from "./generetePassword"
import { ValiarPassword } from "./validarPassword"

export const EditarUsuario = async (body:any,user:any,file:any) =>{
    let {id,passwordNew,password,nome,permissao}:any = body
    const permissoesPermitidas:any = {1: true,4: true,5: true};
    if(id ){
        if(id==user?.id){
            let usuario = await Usuario.findOne({where:{id}})
            if(usuario?.id){
                usuario.nome = nome
                if( permissoesPermitidas[permissao]){
                    usuario.permissao = permissao
                }
            
                if(password && passwordNew){
                    let valida = await ValiarPassword(password,usuario.password)
                    if(valida){
                        let passwordNova = await GeneretePassword(passwordNew)
                        await Usuario.update({password:passwordNova},{where:{id}})
                        return {msg:'Senha atualizada!',error:false}
                    }else{
                        return {msg:"A senha antiga está errada",error:true}
                    }
                }
                if(usuario?.foto){
                    await ApagarArquivo(`public/arquivo/${usuario.foto}`)
                }
                if( file?.foto && file?.foto[0] ){
                   let nome:any =  await Arquivo( file?.foto[0])
                   usuario.foto = nome
                }
               await usuario.save()
               return {msg:'Dados atualizados!',error:false}
            }else{
                return {msg:'Erro encontrado, tente novamente mais tarde!',error:true}
            }
        }else{
            return {msg:'Erro encontrado, tente novamente mais tarde!',error:true}
        }
    }else{
        return {msg:'Erro encontrado, tente novamente mais tarde!',error:true}
    }
    
}