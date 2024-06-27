import { Op } from "sequelize"
import { Usuario } from "../../models/usuario"

export const ValidarEmailCliente = async (email:string) =>{
    let buscar = await Usuario.findOne({where:{email}})
    if(buscar?.id){
        return buscar.permissao==2?true:false
    }else{
        return true
    }
  
   
}