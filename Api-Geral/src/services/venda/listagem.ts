import { Checkout } from "../../models/checkout"
import { Cliente } from "../../models/cliente"
import { Produtor } from "../../models/produtor"
import { Venda } from "../../models/venda"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    Venda.hasOne(Checkout,{foreignKey:'link',sourceKey:'checkoutLink'})
    Checkout.belongsTo(Venda,{foreignKey:'link'})

    Venda.hasOne(Cliente,{foreignKey:'id',sourceKey:'idCliente'})
    Cliente.belongsTo(Venda,{foreignKey:'id'})

    Venda.hasOne(Produtor,{foreignKey:'id',sourceKey:'idProdutor'})
    Produtor.belongsTo(Venda,{foreignKey:'id'})
    let buscar = await Venda.findAll({where:{...(idProdutor && {idProdutor}),...(id && {id})},include:[{model:Cliente,as:'cliente',required:false},{model:Produtor,as:'produtor',required:false},{model:Checkout,as:'checkout',required:false}]})
    if(buscar?.length>0){
       resposta = {msg:'Dados encontrados!',error:true,list:buscar}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}