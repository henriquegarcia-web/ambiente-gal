import { VendaProdutos } from "../../models/vendaProdutos"

export const Cadastrar = async (carrinho:any,idVenda:any,idProdutor:any) =>{
    carrinho.map(async (item:any)=>{
        await VendaProdutos.create({idVenda,idProduto:item.id,idProdutor,valor:item.preco,
            valorAfialiado: item?.areaMembro?.idProdutor==item?.idProdutor?0:(item.preco * (item?.porcentagemAfialiacao/100)) ,
            afiliado:item?.areaMembro?.idProdutor==item?.idProdutor?false:true})
    })
}