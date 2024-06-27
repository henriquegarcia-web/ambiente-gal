import { Usuario } from "../../models/usuario"
import { ApagarArquivo } from "../../utils/arquivo/apagar"
import { Arquivo } from "../../utils/arquivo/criar"
import { Editar } from "../produtor/editar"
import { GeneretePassword } from "./generetePassword"
import { ValiarPassword } from "./validarPassword"

export const AtualizarDados = async (bodys:any,user:any,file:any) =>{
    let body = JSON.parse(bodys.dados)
    let {id,idConta,passwordNew,password,nome,cpfCnpj,cep,rua,numero,bairro,cidade,estado,titular,tipoConta,banco,agencia,agenciaDig,conta,contaDig,validar,chavePix,tipoChave}:any = body
    let foto:any
    let dadosProdutor
    if(id ){
        if(id==user?.id){
            let usuario = await Usuario.findOne({where:{id}})
            if(usuario?.id){
                if(idConta && user.permissao==3){
                    dadosProdutor = await Editar({id:idConta,nome,cpfCnpj,cep,rua,numero,bairro,cidade,estado,titular,tipoConta,banco,agencia,agenciaDig,conta,contaDig,validar,chavePix,tipoChave},file)
                }
               
                if(password && passwordNew){
                    let valida = await ValiarPassword(password,usuario.password)
                    if(valida){
                        let passwordNova = await GeneretePassword(passwordNew)
                        await Usuario.update({password:passwordNova},{where:{id}})
                      
                    }else{
                        return {msg:"A senha antiga está errada",error:true}
                    }
                }
              
                if(file?.foto && file?.foto[0] ){
                    if(usuario?.foto){
                        await ApagarArquivo(`public/arquivo/${usuario.foto}`)
                    }
                    foto =  await Arquivo(file?.foto[0])
                    usuario.foto = foto
                }
                usuario.nome = nome
               await usuario.save()
               return {msg:'Dados atualizados!',error:false,foto:foto,dadosProdutor}
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