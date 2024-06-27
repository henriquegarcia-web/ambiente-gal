import { Produtor } from "../../models/produtor"
import { Arquivo } from "../../utils/arquivo/criar"
import { DocscartaoCNPJ, DocsfrenteIdentidade, DocsselfieDocumento, DocsversoIdentidade } from "./documentos"
import { ApagarArquivo } from "../../utils/arquivo/apagar"
export const Editar = async (body: any, file?: any) => {

    let { id, nome, cpfCnpj, cep, rua, numero, bairro, cidade, estado, titular, tipoConta, banco, agencia, agenciaDig, conta, contaDig ,validar,chavePix,tipoChave} = body
    let versoIdentidade:any
    let frenteIdentidade:any
    let cartaoCNPJ:any
    let selfieDocumento:any
    let resposta: any
    if (id) {
        let editar = await Produtor.findOne({ where: { id } })
        if (editar?.id) {
            Object.assign(editar, { nome, cpfCnpj, cep, rua, numero, bairro, cidade, estado, titular, tipoConta, banco, agencia, agenciaDig: agenciaDig ? agenciaDig : null, conta, contaDig,validar,chavePix,tipoChave })
            let valide = editar.validar
            if(( editar.cpfCnpj && editar.cpfCnpj !=cpfCnpj) || (editar.titular && editar.titular !=titular) || (editar.tipoConta && editar.tipoConta !=tipoConta) || (editar.banco && editar.banco !=banco) ||  (editar.agencia && editar.agencia !=agencia) || (editar.agenciaDig && editar.agenciaDig !=agenciaDig) || (editar.conta && editar.conta !=conta) || (editar.contaDig && editar.contaDig != contaDig)  ){
                valide = 2
            }
            if (file?.versoIdentidade && file?.versoIdentidade[0]) {
                let nome: any = await Arquivo(file.versoIdentidade[0])
                if (nome) {
                    if (editar.versoIdentidade) {
                        await ApagarArquivo(`public/arquivo/${editar.versoIdentidade}`)
                    }

                    versoIdentidade =  nome
                    await DocsversoIdentidade(nome, editar.id)
                    valide = 2
                }
            }else{
                versoIdentidade =  editar.versoIdentidade
            }
            if (file?.frenteIdentidade && file?.frenteIdentidade[0]) {
                let nome: any = await Arquivo(file.frenteIdentidade[0])
                if (nome) {
                    if (editar.frenteIdentidade) {
                    await ApagarArquivo(`public/arquivo/${editar.frenteIdentidade}`)
                    }
                    frenteIdentidade = nome
                    await DocsfrenteIdentidade(nome, editar.id)
                    valide = 2
                }
            }else{
                frenteIdentidade =  editar.frenteIdentidade
            }
            if (file?.cartaoCNPJ && file?.cartaoCNPJ[0]) {
                let nome: any = await Arquivo(file.cartaoCNPJ[0])
                if (nome) {
                    if(editar.cartaoCNPJ){
                        await ApagarArquivo(`public/arquivo/${editar.cartaoCNPJ}`)
                    }
                    cartaoCNPJ = nome
                    await DocscartaoCNPJ(nome, editar.id)
                    valide = 2
                }
            }else{
                cartaoCNPJ =  editar.cartaoCNPJ
            }
            if (file?.selfieDocumento && file?.selfieDocumento[0]) {
                let nome: any = await Arquivo(file.selfieDocumento[0])
                if (nome) {
                    if(editar.selfieDocumento){
                        await ApagarArquivo(`public/arquivo/${editar.selfieDocumento}`)
                    }
                    selfieDocumento= nome
                    await DocsselfieDocumento(nome, editar.id)
                    valide = 2
                }
            }else{
                selfieDocumento =  editar.selfieDocumento
            }
            editar.validar = valide
            await editar.save()
            resposta = { msg: 'Edição realizada com sucesso!', error: false,versoIdentidade,frenteIdentidade,cartaoCNPJ,selfieDocumento,validar: valide}
        } else {
            resposta = { msg: 'Item não encontrado!', error: true }
        }
    } else {
        resposta = { msg: 'Preencha todos os dados!', error: true }
    }
    return resposta
}