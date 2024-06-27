import { Op } from "sequelize"
import { Usuario } from "../../models/usuario"

export const EditarEmail = async (email:string,idConta?:number,permissao?:number) =>{
    if(email){
        await Usuario.update({email},{where:{...(permissao && {permissao}),...(idConta && {idConta})}})
    }
    return true
}