import { AreaMembro } from "../../models/areaMembro"
import { Checkout } from "../../models/checkout"
import { Produto } from "../../models/produto"
import { Venda } from "../../models/venda"
import { VendaProdutos } from "../../models/vendaProdutos"

export const ListagemVendasCliente = async ( params?: any) => {
    let { id = null ,idCliente=null} = params ?? {}
    let resposta: any
   
    Venda.hasMany(VendaProdutos, { foreignKey: 'idVenda' ,sourceKey:'id'})
    VendaProdutos.belongsTo(Venda, { foreignKey: 'idVenda' })

    VendaProdutos.belongsTo(Produto, { foreignKey: 'idProduto' })
    Produto.hasMany(VendaProdutos, { foreignKey: 'id' })

    Produto.belongsTo(AreaMembro, { foreignKey: 'idAreaMembro' })
    AreaMembro.hasMany(Produto, { foreignKey: 'id' })
    
    let buscar :any= await Venda.findAll({ where: { ...(idCliente && {idCliente}), ...(id && { id }),status:'Aprovado' }, include: [{ model: VendaProdutos, as: 'vendaProdutos', required: false,include:[{model:Produto,as:'produto',required:false,include:[{model:AreaMembro,as:'areaMembro',required:false}]}] }] })
  
    if (buscar?.length > 0) {
    
        let listagem = buscar.map((item:any)=>{return {links:item.vendaProdutos?.map((item2:any)=>{return item2.produto.areaMembro.link})}})
        resposta = { msg: 'Dados encontrados!', error: true, list: listagem[0] }
    } else {
        resposta = { msg: 'Item não encontrado!', error: true }
    }
    return resposta
}