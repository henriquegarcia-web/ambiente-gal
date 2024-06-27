import { Checkout } from "../../models/checkout"
import { Cupom } from "../../models/cupom"
import { Pixel } from "../../models/pixel"
import { Listagem as ListProdutos } from "../../services/produto/listagem"
import { Listagem as ListPixel } from "../../services/pixel/listagem"
import { Taxas } from "../../utils/taxas"
import { Tipos } from "./tipos"
export const Listagem = async (user:any,params?:any) =>{
    let { id = null ,link=null} = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
  

 
    Checkout.hasOne(Cupom,{foreignKey:'id',sourceKey:'idCupom'})
    Cupom.belongsTo(Checkout,{foreignKey:'id'})

    let buscar = await Checkout.findAll({where:{...(idProdutor && {idProdutor}),...(id && {id}),...(link && {link})},include:[{model:Cupom,as:'cupom',required:false}]})
    if(buscar?.length>0){
        idProdutor = buscar[0].idProdutor
        let listProdutos = await ListProdutos(null,0,idProdutor)
        let listPixels = await ListPixel({idConta:idProdutor})
        let listagem = buscar.map((item:any)=>{return {status:item.status,idProdutor:item.idProdutor,idCupom:item.idCupom,idPixel:item.idPixel,id:item.id,nome:item.nome,descricao:item.descricao,time:item.time,link:item.link,imagem:item.imagem,cupom:item.cupom,pixels:listPixels?.list?.filter((pixel:any)=> String(item?.idPixel)?.split('-')?.includes(String(pixel.id))),tipo:Tipos?.filter((type)=> item?.recorrencia?.split('-').includes(String(type.id))),produtos:listProdutos?.list?.filter((produto:any)=> item.idProduto?.split('-')?.includes(String(produto.id))) ,taxas:Taxas,postback:item.postback,corPrimaria:item.corPrimaria,corSecundaria:item.corSecundaria,corTerciaria:item.corTerciaria,corQuaternaria:item.corQuaternaria,statusEndereco:item?.statusEndereco,statusCupom:item?.statusCupom,statusTimer:item?.statusTimer, statusEmail: item?.statusEmail}})
       
        resposta = {msg:'Dados encontrados!',error:false,list:listagem}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}