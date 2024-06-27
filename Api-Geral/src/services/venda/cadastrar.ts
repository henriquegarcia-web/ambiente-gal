import { Cadastrar as CadastrarCliente } from "../cliente/cadastrar"
import { Cadastrar as CadastrarVendaProdutos } from "../vendaProdutos/cadastrar"
import { ValidarEmail } from "../usuario/validarEmail"
import { Valida } from "./valida"
import { Valida as ValidaCliente } from "../cliente/valida"
import { Venda } from "../../models/venda"
import { Valor } from "./preco"
import { Api } from "../../integration/ApiTransacao"
import { Valida as validaRequerente } from "../requerente/valida"
import * as CardValidator from 'card-validator';
import { Valores } from "../produtor/valores"
import { Times } from "../../utils/time"
import { Listagem } from "../produtor/listagem"
import { CompraRalizada } from "../../integration/email"
import { ValidarEmailCliente } from "../usuario/validaEmailCliente"
import { Listagem as ListagemCliente } from "../cliente/listagem"
import { DispararEvento } from "./webhook"
import { Compra } from "./disparoFacebook"
import ip from 'ip'

export const Cadastrar = async (body: any,client:any) => {
    let {  checkoutLink, nome, email, cpfCnpj, celular, cep, rua, numero, bairro, cidade, estado, complemento, tipo, titular, cardNumero, cardMes, cardAno, cardCvv, parcelas, cupomName, carrinho } = body
    const clientIp = ip.address();
    let bandeira
    if (cardNumero) {
        const cardInfo = CardValidator.number(cardNumero);
        if (cardInfo.card) {
            bandeira = cardInfo.card.type
        }
    }
    let time = await Times()
  
    let ids = carrinho.map((item: any) => { return { id: item.id, valor: item.preco } })
    
    let resposta: any
    let validaRequere = await validaRequerente()
    if (validaRequere?.list?.id) {
        if (checkoutLink && email && cpfCnpj && celular && tipo) {
            let valida: any = await Valida(checkoutLink)
            if (valida?.list?.length > 0) {
                let chackout = valida.list[0]
                let idProdutor = valida?.list[0]?.idProdutor
                
                let valor = await Valor(carrinho, valida, idProdutor, cupomName, parcelas, bandeira)
                let buscarProdutor = await Listagem({id:idProdutor})
                buscarProdutor= buscarProdutor.list[0]
               
                let valorReal = (valor- (valor * buscarProdutor.taxaVariavel/100)) - buscarProdutor.taxaFixa
                let valorRetido = buscarProdutor.taxaRetido? ((buscarProdutor.taxaRetido/100 )* valorReal):0
                valorReal = valorReal  - (buscarProdutor.taxaRetido?  ((buscarProdutor.taxaRetido/100 )* valorReal):0)
               
          
                let validaUser = await ValidarEmailCliente(email)
                if (validaUser) {
                    let buscarCliente = await ListagemCliente({idConta:idProdutor}, {email:email})
                    if (true) {
                        let response: any = await Api.index({ servico: 1, dadosVendas: { nome, email, parcelas,celular, tipo, cpf: cpfCnpj, valor,titular,cardNumero, cardMes, cardAno, cardCvv } })
                        if((response[0]?.id) || response?.id){
                            let cadastrar = await Venda.create({ idProdutor, checkoutLink, nome, email, cpf: cpfCnpj, celular, cep, rua, numero, bairro, cidade, estado, complemento, tipo, valor, cupomName, data: time.data, hora: time.hora, parcelas,valorLiquido:valorReal,valorRetido,status:'Pendente',ip:clientIp,clientUserAgent:`${client.browser}/${client.version}` })
                            if (cadastrar?.id) {
                                // let response: any = { id: 1, status: 'Aprovado' }
                                await CadastrarVendaProdutos(carrinho, cadastrar.id, idProdutor)
                                if ((response[0]?.id) || response?.id) {
                                    let cadastrarCliente
                                    if (response.status == 'Aprovado') {
                                        if(buscarCliente.error){
                                            cadastrarCliente = await CadastrarCliente({ idVenda: cadastrar.id, nome, email, cpfCnpj, celular, cep, rua, numero, bairro, cidade, estado, complemento }, { idConta: idProdutor })
                                        }else{
                                            cadastrarCliente = buscarCliente.list[0]
                                        }
                                        await CompraRalizada(email)
                                    }
                                    await Venda.update({ idCliente: cadastrarCliente?.id ? cadastrarCliente.id : 0, idTransacao: (response[0] && response[0]?.id) ? response[0]?.id : response?.id, status: response?.status =='Aprovado' ? response.status : 'Pendente', url: response?.paymentLink ? response.paymentLink : response[0] ? response[0].emv : '', compensacao: response?.status == 'Aprovado' ? true : false }, { where: { id: cadastrar?.id } })
                                    if (response.status == 'Aprovado') {
                                        await DispararEvento(idProdutor,1,{id:`${cadastrar.id}`,status:'Aprovado',valor:valorReal})
                                       // await Valores(cadastrar.id, ids, idProdutor, tipo,cupomName)
                                       await Compra({id:cadastrar.id,pixels:chackout.pixels,email:email,link:checkoutLink,valor:valorReal,data:new Date(),clientIp,clientUserAgent:`${client.browser}/${client.version}`})
                                       await Valores(valorReal,valor, idProdutor, tipo,valorRetido)

                                    }
                                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false, response, id: cadastrar.id }
                                } else {
                                    resposta = { msg: 'Cadastro realizado com sucesso!', error: false, response: [], id: cadastrar.id }
                                }
                            } else {
                                resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                            }
                        }else{
                            let error = `${response.message.includes('telefone') && response.message.includes('válido')?'Telefone inválido':'' }`
                            error = `${response.message.includes('Validade')?'Validade do cartão inválida':'' }`
                            error = `${response.message.includes('holder')?'Titular inválido':'' }`
                            resposta = { msg: `Erro, ${error?error:'dados inválidos'}`, error: true }
                        }
                    } else {
                        resposta = { msg: 'Dados já cadastrados!', error: true }
                    }
                } else {
                    resposta = { msg: 'Email já utlizado!', error: true }
                }
            } else {
                resposta = { msg: 'Dados já cadastrados!', error: true }
            }
        } else {
            resposta = { msg: 'Preencha todos os dados!', error: true }
        }
    } else {
        resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
    }
    return resposta
}