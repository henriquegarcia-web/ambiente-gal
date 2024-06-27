import { Afiliacao } from "../../models/afiliacao"
import { AreaMembro } from "../../models/areaMembro"
import { Produto } from "../../models/produto"
import { Produtor } from "../../models/produtor"
import { Tipos } from "./tipos"

export const Listagem = async (params?:any,afiliacao?:number,user?:any) =>{
    let idProdutor = user?.idConta
    let { id = null } = params ?? {}
    let resposta:any
    Produto.hasMany(Afiliacao,{foreignKey:'idProduto'})
    Afiliacao.belongsTo(Produto,{foreignKey:'id'})

    Produto.hasOne(AreaMembro,{foreignKey:'id',sourceKey:'idAreaMembro'})
    AreaMembro.belongsTo(Produto,{foreignKey:'id'})

    Produto.hasOne(Produtor,{foreignKey:'id',sourceKey:'idProdutor'})
    Produtor.belongsTo(Produto,{foreignKey:'id'})

    let buscar = await Produto.findAll({where:{...(afiliacao ==1 && {afiliacao:true} ),...(id && {id})},include:[{model:Produtor,as:'produtor',required:false},{model:Afiliacao,as:'afiliacoes',required:false},{model:AreaMembro,as:'areaMembro',required:false}]})
    if(buscar?.length>0){
        let list = buscar.map((item:any)=>{return{id:item.id,idProdutor:item.idProdutor,produtor:item.produtor,idAreaMembro:item.idAreaMembro,nome:item.nome,descricao:item.descricao,preco:item.preco,porcentagemAfialiacao:item.porcentagemAfialiacao,imagem:item.imagem,afiliacao:item.afiliacao,areaMembro:item.areaMembro,tipo:item.tipo,afiliacoes:item.afiliacoes.some((item2:any)=>item2.idProdutor==idProdutor && item2.status==true)?item.afiliacoes:[] }})
    

        let listagem = list.map((item:any)=> idProdutor?( item.idProdutor==idProdutor || (item?.afiliacoes?.some((afli:any)=>afli.idProdutor == idProdutor) ))  ?  {id:item.id,idProdutor:item.idProdutor,produtor:item.produtor,idAreaMembro:item.idAreaMembro,nome:item.nome,descricao:item.descricao,preco:item.preco,porcentagemAfialiacao:item.porcentagemAfialiacao,imagem:item.imagem,afiliacao:item.afiliacao,afiliacoes:item.afiliacoes,areaMembro:item.areaMembro,msg:item.idProdutor==idProdutor ?'Produtor':'Afiliado',tipo:Tipos?.filter((type)=>type.id==Number(item.tipo))[0]} :{type:'invalido'}
        : {id:item.id,idProdutor:item.idProdutor,produtor:item.produtor,idAreaMembro:item.idAreaMembro,nome:item.nome,descricao:item.descricao,preco:item.preco,porcentagemAfialiacao:item.porcentagemAfialiacao,imagem:item.imagem,afiliacao:item.afiliacao,afiliacoes:item.afiliacoes,msg:'Afiliado',areaMembro:item.areaMembro,tipo:Tipos?.filter((type)=>type.id==Number(item.tipo))[0]} ).filter((item)=>item.type!='invalido')
      
        
       resposta = {msg:'Dados encontrados!',error:true,list:listagem}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}