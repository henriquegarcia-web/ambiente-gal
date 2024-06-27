import { Plataforma } from "../../models/plataforma"
import { Produtor } from "../../models/produtor"
import { Listagem } from "../produto/listagem"
import { Listagem as ListagemCheckout } from "../checkout/listagem"
import { Valida as validaRequerente } from "../requerente/valida"
import { io } from 'socket.io-client'
const socket = io(`${process.env.API_GERAL}`)

export const Valores = async (valorLiquido: any, valor: any, idProdutor: any, tipo: any,valorRetido:any) => {
    // linkCheckout:any,ids:any,idProdutor:any,tipo:any,cupom:string
   
    
    let valorPlataforma = valor - valorLiquido
    valorPlataforma = valorPlataforma - (tipo == 1 ? valor * 0.75 / 100 : 0)
    let buscarProdutor = await Produtor.findOne({ where: { id: idProdutor } })
    if (buscarProdutor?.id) {

  


        await Produtor.update({ valorRetido:buscarProdutor.valorRetido + parseFloat(valorRetido),valorTotal: buscarProdutor.valorTotal + parseFloat(valorLiquido), ...(tipo == 1 ? { saldoDisponivel: buscarProdutor.saldoDisponivel + parseFloat(valorLiquido) } : { saldoPendente: buscarProdutor.saldoPendente + parseFloat(valorLiquido) }) }, { where: { id: idProdutor } })
    }

    let buscarPlataforma = await Plataforma.findOne({ where: { id: 1 } })
    if (buscarPlataforma?.id) {
        await Plataforma.update({ valor: buscarPlataforma.valor + valorPlataforma }, { where: { id: 1 } })
    }
    
    // let cupomValor = 0
    // let requerente = await validaRequerente()

    // let checkouts:any = await ListagemCheckout({},{link:linkCheckout})
    // if(checkouts.list[0]?.id){
    //     cupomValor = (checkouts.list[0]?.cupom?.nome == cupom)?checkouts.list[0].valor:0
    // }

    // let boleto = parseFloat(requerente.list?.boletoFixa) 
    // let pix = parseFloat(requerente.list?.pixVariavel)
    // let produtos = await Listagem({id:null},0,{idConta:idProdutor})
    // let produtor = await Listagem({id:idProdutor})

    // let valores = produtos.list.map((item:any)=>{return {
    //     produtor:item.idProdutor==idProdutor?idProdutor:0,
    //     afialiado:item.idProdutor!=idProdutor?idProdutor:0,
    //     valorProdutor:(item.preco - cupomValor ) - ( ( (item.preco - cupomValor ) * item.produtor?.taxaVariavel/100) + item.produtor?.taxaFixa),
    //     valorAfialiado:item.idProdutor!=idProdutor? (( (item.preco - cupomValor ) - ((item.preco - cupomValor ) * (item.porcentagemAfialiacao/100) )) - ( (item.preco - cupomValor ) * produtor.taxaVariavel/100) + produtor.taxaFixa) :0,
    //     plataforma:(( (item.preco - cupomValor ) * item.produtor?.taxaVariavel/100) + item.produtor?.taxaFixa) - (tipo==1?(item.preco - cupomValor )*(pix/100):tipo==3?boleto:0),
    //  }})

    //  valores.forEach( async (element:any) => {
    //     let buscarProdutor = await Produtor.findOne({where:{id:element.produtor}})
    //     if(buscarProdutor?.id){
    //         await Produtor.update({valorTotal:buscarProdutor.valorTotal + element.valorProdutor,...(tipo==1 ? {saldoDisponivel:buscarProdutor.saldoDisponivel + element.valorProdutor}:{saldoPendente:buscarProdutor.saldoPendente + element.valorProdutor})},{where:{id:element.produtor}})
    //     }
    //     let buscarAfiliado = await Produtor.findOne({where:{id:element.afialiado}})
    //     if(buscarAfiliado?.id){
    //         await Produtor.update({valorTotal:buscarAfiliado.valorTotal + element.valorAfialiado,...(tipo==1 ? {saldoDisponivel:buscarAfiliado.saldoDisponivel + element.valorAfialiado}:{saldoPendente:buscarAfiliado.saldoPendente + element.valorAfialiado})},{where:{id:element.afialiado}})
    //     }
    //  });

    // let plataforma = valores.reduce((acumulador:any,element:any)=>{ return acumulador + element.plataforma },0) 
    // let buscarPlataforma = await Plataforma.findOne({where:{id:1}})
    // if(buscarPlataforma?.id){
    //     await Plataforma.update({valor:buscarPlataforma.valor + plataforma},{where:{id:1}})
    // }

}