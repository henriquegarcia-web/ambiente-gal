
import { CronJob } from 'cron';
import { Venda } from '../models/venda';
import { Op } from 'sequelize';
import { VendaProdutos } from '../models/vendaProdutos';

export  const job = new CronJob('0 0 * * * * ', async() => {
   
  },'America/Sao_Paulo');

// const Vendas = async () =>{
//     let buscar = await Venda.findAll({where:{compensacao:{[Op.ne]:true}}})
//     if(buscar.length>0){
//         buscar.map(async(item:any)=>{
//             let buscarVendaProdutos = await VendaProdutos.findAll({where:{idVenda:item.id}})
//             if(buscarVendaProdutos.length>0){
//                 let ids = buscarVendaProdutos.map((item2)=>{return {id:item2,valor:item2.valor}})
//                 await
//             }
//         })
//     }else{
//         console.log('Venda compensadas')
//     }
// }
