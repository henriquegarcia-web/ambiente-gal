import { Listagem } from "../vendaProdutos/listagem"
import { Venda } from "../../models/venda"
import { Valores } from "../produtor/valores"
import { Cadastrar as CadastrarCliente } from "../cliente/cadastrar"
import { io } from 'socket.io-client'
import { Op } from "sequelize"
import { CompraRalizada } from "../../integration/email"
import { Listagem as ListagemCliente } from "../cliente/listagem"
import { Compra } from "./disparoFacebook"
import { Valida } from "./valida"
import { DispararEvento } from "./webhook"

const socket = io(`${process.env.API_GERAL}`)
export const retorno = async (body: any) => {
    //await DispararEvento(3,1,{id:1,status:'Aprovado',valor:100})
    let { transaction_id, transaction_status } = body
    if (transaction_id  ) {
        let venda: any = await Venda.findOne({ where: { idTransacao: transaction_id,[Op.or]: [{ status: null }, { status: 'Pendente' }] } })
        if (venda?.id ) {
            await Venda.update({status:transaction_status,compensacao:true},{where:{id:venda.id}})
        //     venda.status = transaction_status
        //    venda.compensacao = true
          
            socket.emit('Retorno', { id: venda.id,idConta: venda?.idProdutor, status: 'Aprovado',valor:venda.valorLiquido })
            if (transaction_status == "Aprovado") {
                let valida: any = await Valida(venda.checkoutLink)
                let chackout = valida.list[0]
                let vendasProdutos = await Listagem(venda.id)

                let idProdutor = venda?.idProdutor
                let tipo = venda?.tipo
                // let ids = vendasProdutos.map((item) => { return { id: item.idProduto, valor: item.valor } })
                // await Valores(venda.idCheckout,ids, idProdutor, tipo,venda?.cupomName)
               await Valores(venda.valorLiquido,venda.valor, idProdutor, tipo,venda.valorRetido)
               await DispararEvento(idProdutor,1,{id:`${venda.id}`,status:'Aprovado',valor:venda.valorLiquido})
            

                await Compra({id:venda.id,pixels:chackout.pixels,email:venda.email,link:venda.checkoutLink,valor:venda.valor,data:new Date(),clientUserAgent:venda.clientUserAgent,clientIp:venda.ip})
                let buscarCliente = await ListagemCliente({idConta:idProdutor}, {email:venda.email})
                let cadastrarCliente
                if(buscarCliente.error){
                   cadastrarCliente = await CadastrarCliente({ idVenda: venda.id, nome: venda.nome, email: venda.email, cpfCnpj: venda.cpf, celular: venda.celular, cep: venda.cep, rua: venda.rua, numero: venda.numero, bairro: venda.bairro, cidade: venda.cidade, estado: venda.estado, complemento: venda.complemento }, { idConta: venda.idProdutor })
                }else{
                    cadastrarCliente = buscarCliente.list[0]
                }

             
                if (cadastrarCliente?.id) {
                   await Venda.update({ idCliente: cadastrarCliente.id }, { where: { id: venda.id } })
                }
            

                //await CompraRalizada(venda.email)
           
            }
       
        }
    }
    return { error: false, msg: 'Retorno da transação' }
}