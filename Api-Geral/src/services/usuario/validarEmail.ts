import { Op } from "sequelize"
import { Usuario } from "../../models/usuario"

export const ValidarEmail = async (email:string,idConta?:number,permissao?:number) =>{
    if(email){
        let buscar = await Usuario.findAll({where:{email,...(permissao && {permissao}),...(idConta && {idConta:{[Op.ne]:idConta}})}})
        return buscar.length ==0 ?true:false
    }else{
        return false
    }
   
}