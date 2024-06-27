import { Checkout } from "../../models/checkout"
import { ApagarArquivo } from "../../utils/arquivo/apagar"
import { Arquivo } from "../../utils/arquivo/criar"
import { Imagem } from "./imagem"
import { Valida } from "./valida"
import { ValidaCupom } from "./validaCupom"
import { ValidaPixel } from "./validaPixel"
import { ValidaProduto } from "./validaProduto"

export const Editar = async (bodys: any,file:any,user:any) => {
    let body = JSON.parse(bodys.dados)
    let {id,idCupom,idPixel,idProduto, nome,descricao,time , recorrencia,status,postback,corPrimaria,corSecundaria,corTerciaria,corQuaternaria,statusEndereco,statusCupom,statusTimer,statusEmail} = body
    let resposta: any
    let idProdutor = user?.idConta
    if(id && idProduto && nome && recorrencia && idProdutor ){
        let validaCupom = idCupom?await ValidaCupom(idCupom,idProdutor):true
        if(validaCupom){
            let validaPixel = idPixel? await ValidaPixel(idPixel,idProdutor):true
            if(validaPixel){
                let validaProduto = await ValidaProduto(idProduto,idProdutor)
                if(validaProduto){
                    let valida = await Valida(nome,id)
                    if(valida){
                        let editar = await Checkout.findOne({ where: {idProdutor, id } })
                        if (editar?.id) {
                            if (file?.fieldname == 'imagem') {
                                let nome: any = await Arquivo(file)
                                if (nome) {
                                    await ApagarArquivo(`public/arquivo/${editar.imagem}`)
                                    await Imagem(nome, editar.id)
                                }
                            }
                            Object.assign(editar, { idCupom:idCupom?idCupom:null,idPixel:idPixel?idPixel:null,idProduto, nome,descricao,time:time?time:null,recorrencia,status:status=="true"?true:false,postback,corPrimaria,corSecundaria,corTerciaria,corQuaternaria,statusEndereco,statusCupom,statusTimer,statusEmail})
                            await editar.save()
                            resposta = { msg: 'Edição realizada com sucesso!', error: false }    
                        } else {
                            resposta = { msg: 'Item não encontrado!', error: true }
                        }
                    }else{
                        resposta = { msg: 'Dados já cadastro!', error: true }
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
    }else{
        resposta = {msg:'Preencha todos os dados!',error:true}
    }
    return resposta
}