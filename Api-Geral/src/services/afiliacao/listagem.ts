import { Afiliacao } from "../../models/afiliacao"
import { Produto } from "../../models/produto"
import { Produtor } from "../../models/produtor"

export const Listagem = async (user:any,params?:any) =>{
    let { id = null } = params ?? {}
    let resposta:any
    let idProdutor = user?.idConta
    Afiliacao.hasOne(Produto,{foreignKey:'id',sourceKey:'idProduto'})
    Produto.belongsTo(Afiliacao,{foreignKey:'id'})

    Afiliacao.hasOne(Produtor,{foreignKey:'id',sourceKey:'idProdutor'})
    Produtor.belongsTo(Afiliacao,{foreignKey:'id'})


    let buscar = await Afiliacao.findAll({where:{...(id && {id})},include:[{model:Produto,as:'produto',required:false},{model:Produtor,as:'produtor',required:false}]})
    if(buscar?.length>0){
        let listagem = buscar.map((item: any) => 
        idProdutor == item.idProdutor
          ? { type: 'Afiliado', id: item.id,produtor:item?.produtor, idProdutor: item.idProdutor,data:item.createdAt, status: item.status ? 'Aprovado' : 'Aguardando Aprovação', produto: item.produto }
          : (idProdutor == item.produto.idProdutor
              ? { type: 'Produtor', id: item.id,produtor:item?.produtor, idProdutor: item.idProdutor,data:item.createdAt, status: item.status ? 'Aprovado' : 'Aguardando Aprovação', produto: item.produto }
              : { type: 'Indefinido' ,id:item.id})
      ).filter(item => item.type !== 'Indefinido');
       resposta = {msg:'Dados encontrados!',error:true,list:listagem}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}