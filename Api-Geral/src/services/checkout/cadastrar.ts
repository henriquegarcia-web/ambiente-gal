
import { Checkout } from "../../models/checkout"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { Valida } from "./valida"
import { v4 as uuid } from "uuid"
import { ValidaProduto } from "./validaProduto"
import { ValidaPixel } from "./validaPixel"
import { ValidaCupom } from "./validaCupom"
import { ValidaProdutor } from "../produtor/validaProdutor"

export const Cadastrar = async (bodys: any, file: any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let {idCupom,idPixel,idProduto, nome,descricao,time,recorrencia,status,postback,corPrimaria,corSecundaria,corTerciaria,corQuaternaria,statusEndereco,statusCupom,statusTimer,statusEmail} = body
    let resposta: any
    let idProdutor = user?.idConta
    let validaProdutor = await ValidaProdutor(idProdutor)
    if(validaProdutor){
        if ( idProduto && nome   && recorrencia && idProdutor) {
            let validaCupom =idCupom? await ValidaCupom(idCupom,idProdutor):true
            if(validaCupom){
                let validaPixel =idPixel? await ValidaPixel(idPixel,idProdutor):true
                if(validaPixel){
                    let validaProduto = await ValidaProduto(idProduto,idProdutor)
                    if(validaProduto){
                        let valida = await Valida(nome,idProdutor)
                        if (valida) {
                            let link = uuid()
                            let cadastrar = await Checkout.create({idProdutor, idCupom:idCupom?idCupom:null,idPixel:idPixel?idPixel:null,idProduto, nome,descricao,time:time?time:null,link ,recorrencia ,status:status=="true"?true:false,postback,corPrimaria ,corSecundaria,corTerciaria,corQuaternaria,statusEndereco,statusCupom,statusTimer,statusEmail})
                            if (cadastrar?.id) {
                                if (file?.fieldname == 'imagem') {
                                    let nome: any = await Arquivo(file)
                                    if (nome) {
                                        await Imagem(nome, cadastrar.id)
                                    }
                                }
                                resposta = { msg: 'Cadastro realizado com sucesso!', error: false,id:cadastrar.id,link }
                            } else {
                                resposta = { msg: 'Error, tente novamente mais tarde!', error: true }
                            }
                        } else {
                            resposta = { msg: 'Dados já cadastrados!', error: true }
                        }
                    }else{
                        resposta = { msg: 'Permissão de produtos negada!', error: true }
                    }
                }else{
                    resposta = { msg: 'Permissão de Pixel negada!', error: true }
                }
            }else{
                resposta = { msg: 'Permissão de cupons negada!', error: true }
            }
        } else {
            resposta = { msg: 'Preencha todos os dados!', error: true }
        }
    }else{
        resposta = { msg: 'Complete seu cadastro para poder utilizar essa funcionalidade!', error: true }  
    }
    return resposta
}