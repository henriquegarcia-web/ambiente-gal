import {Listagem as list } from "../produto/listagem"

export const Produtos = async (user:any) =>{
    let resposta:any
    let listagem:any = await list(null,1,user)
  
    if(listagem?.list?.length>0){
        let list = listagem.list?.filter((item:any)=>item.idProdutor!=user.idConta)
        list = list?.map((item:any)=>{return {...item,msg:item.afiliacoes.find((item2:any)=>item2.idProdutor==user.idConta)?.status?'Afiliado':'Não afiliado' }})
       resposta = {msg:'Dados encontrados!',error:true,list}
    }else{
        resposta = {msg:'Item não encontrado!',error:true}
    }
    return resposta
}