import { DataTypes, QueryTypes } from "sequelize"
import { Venda } from "../../models/venda"
import { Times } from "../../utils/time"
import { Listagem } from "../produtor/listagem"
import { Plataforma } from "../../models/plataforma"

export const Dashboard = async (user:any) =>{
    let plataforma :any= user.permissao==1? await Plataforma.findOne({where:{id:1}}) : 0
   let idConta = user.permissao==3? user.idConta:null
//   let idConta = 30
    let time = await Times()
    

    if(idConta){
          
        let buscar = await Listagem({id:idConta})
        let [valorHoje,row] :any= await Venda.sequelize?.query(`Select sum("valorLiquido") as valor from venda where data = :data and status='Aprovado' and "idProdutor"=:idProdutor`,{type:QueryTypes.SELECT,replacements:{data:time.data,idProdutor:idConta}})

        let listagem :any= await Venda.sequelize?.query(`WITH AllDays AS (
            SELECT generate_series(
                     DATE_TRUNC('MONTH', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo'), 
                     DATE_TRUNC('MONTH', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo') + INTERVAL '1 MONTH - 1 day', 
                     '1 day'::interval
                   ) AS day
          )
          SELECT 
              COALESCE(SUM(v."valorLiquido"), 0) AS valor,
              EXTRACT(DAY FROM a.day) AS dia
          FROM 
              AllDays a
          LEFT JOIN 
              venda v ON EXTRACT(DAY FROM a.day) = EXTRACT(DAY FROM v.data AT TIME ZONE 'America/Sao_Paulo') 
                      AND v.status = 'Aprovado' 
                      AND v."idProdutor" = :idProdutor
          GROUP BY 
              EXTRACT(DAY FROM a.day)
          ORDER BY 
              EXTRACT(DAY FROM a.day);
          `,{type:QueryTypes.SELECT,replacements:{data:time.data,idProdutor:idConta}})
        
        let listagemVenda = await Venda.findAll({where:{idProdutor:idConta,status:'Aprovado'}})
        let pix = listagemVenda.filter((item)=>item.tipo=='1')
        let boleto = listagemVenda.filter((item)=>item.tipo=='3')
        let cartao = listagemVenda.filter((item)=>item.tipo=='2')
        return {valorHoje:valorHoje?.valor,valorPendente:buscar.list[0].saldoPendente,valorTotal:buscar.list[0].valorTotal,valorDisponivel:buscar.list[0].saldoDisponivel,pix:pix?.length,boleto:boleto?.length,cartao:cartao?.length,vendasDiarias:listagem}
    }else{
   
        let [valorHoje,row] :any= await Venda.sequelize?.query(`Select sum(valor) as valor from venda where data = :data and status='Aprovado' `,{type:QueryTypes.SELECT,replacements:{data:time.data}})

        let listagem :any= await Venda.sequelize?.query(`WITH AllDays AS (
            SELECT generate_series(
                     DATE_TRUNC('MONTH', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo'), 
                     DATE_TRUNC('MONTH', CURRENT_DATE AT TIME ZONE 'America/Sao_Paulo') + INTERVAL '1 MONTH - 1 day', 
                     '1 day'::interval
                   ) AS day
          )
          SELECT 
              COALESCE(SUM(v.valor), 0) AS valor,
              EXTRACT(DAY FROM a.day) AS dia
          FROM 
              AllDays a
          LEFT JOIN 
              venda v ON EXTRACT(DAY FROM a.day) = EXTRACT(DAY FROM v.data AT TIME ZONE 'America/Sao_Paulo') 
                      AND v.status = 'Aprovado' 
          GROUP BY 
              EXTRACT(DAY FROM a.day)
          ORDER BY 
              EXTRACT(DAY FROM a.day);
          `,{type:QueryTypes.SELECT,replacements:{data:time.data}})
        let listagemVenda = await Venda.findAll({where:{status:'Aprovado'}})
        let pix = listagemVenda.filter((item)=>item.tipo=='1')
        let boleto = listagemVenda.filter((item)=>item.tipo=='3')
        let cartao = listagemVenda.filter((item)=>item.tipo=='2')
     
        return {valorHoje:valorHoje?.valor,valorPendente:0,valorTotal:0,valorDisponivel:plataforma.valor,pix:pix?.length,boleto:boleto?.length,cartao:cartao?.length,vendasDiarias:listagem}


    }

    // if(buscar.list[0]?.id){




    //     let vendas = await Venda.findAll({where:{status:'Aprovado',...(idConta && {idProdutor:idConta}),data:time.data}})
    //     let vendasGerais = await Venda.findAll({where:{...(idConta && {idProdutor:idConta}),}})
     
    //     let boletosGerados = vendasGerais.filter((item)=>Number(item.tipo)==3)
    //     let aprovacaoBoleto = boletosGerados.filter((item)=>item.status=='Aprovado')
    //     let taxaAprovacaoBoleto=0
    //     if(boletosGerados?.length>0 && aprovacaoBoleto.length>0){
    //         taxaAprovacaoBoleto = (aprovacaoBoleto.length/boletosGerados.length) * 100
    //     }

    //     let vendasCartao =  vendasGerais.filter((item)=>Number(item.tipo)==2)
    //     let aprovacaoCartao = vendasCartao.filter((item)=>item.status=='Aprovado')
        
    //     let taxaAprovacaoCartao=0
    //     if(aprovacaoCartao?.length>0 && vendasCartao.length>0){
    //         taxaAprovacaoCartao = (aprovacaoCartao.length/vendasCartao.length) * 100
    //     }
    //     let pixCartao =  vendasGerais.filter((item)=>Number(item.tipo)==1)
    //     let dados = buscar.list[0]
    //     let valorLiquido = dados.valorTotal
    //     let vendaAnuais
    //     if(idConta){
    //          vendaAnuais = await Venda.sequelize?.query(`SELECT EXTRACT(YEAR FROM data) AS ano, SUM("valorLiquido") AS total_vendas
    //          FROM venda
    //          WHERE "idProdutor" = :idProdutor and status='Aprovado'
    //          GROUP BY EXTRACT(YEAR FROM data);`,{replacements:{idProdutor:idConta?idConta:null},type:QueryTypes.SELECT})
    //     }else{
    //         vendaAnuais = await Venda.sequelize?.query(`SELECT EXTRACT(YEAR FROM data) AS ano, SUM("valor") AS total_vendas
    //         FROM venda
    //         WHERE  status='Aprovado'
    //         GROUP BY EXTRACT(YEAR FROM data);`,{type:QueryTypes.SELECT})
    //     }
     
    //     return {error:false,valorLiquido,vendasDiarias:vendas?.length,taxaAprovacaoCartao,taxaAprovacaoBoleto,boletosGerados:boletosGerados?.length,msg:'',pix:pixCartao?.length,cartao:vendasCartao?.length,boleto:boletosGerados.length,vendaAnuais,plataforma:plataforma?.valor}
    // }else{
    //     return {error:true,msg:'Dados não encontrados!'}
    // }
}