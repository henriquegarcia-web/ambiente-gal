import { Boleto } from "./boleto"
import { CartaoCredito } from "./cartaoCredito"
import { CartaoDebito } from "./cartaodebito"
import { Pix } from "./pix"

export const index = async (body:any) =>{
    let {tipo} = body
    let resposta:any
    if(tipo==1){
        resposta = await Boleto(body)
    }else if(tipo==2){
        resposta = await CartaoCredito(body)
    }else if(tipo==3){
        resposta = await CartaoDebito(body)
    }else if(tipo==4){
        resposta = await Pix(body)
    }
    return resposta
}