import { Boleto } from "./boleto"
import { CartaoCredito } from "./cartaoCredito"

import { Pix } from "./pix"

export const Saqja = async (dados:any) =>{
    let response:any
    if(dados.tipo==1){
        response =  await Pix(dados)
    }else if(dados.tipo==3){
        response =  await Boleto(dados)
    }else if(dados.tipo==2){
        response =  await CartaoCredito(dados)
    }
    return response
}