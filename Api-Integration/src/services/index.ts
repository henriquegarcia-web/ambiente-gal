import { Saqja } from "./saqja"

export const Services = async (body:any) =>{
    let { servico,dadosVendas,dadosIntegracoes } = body
    let response
    if(servico==1){
        response = await Saqja(dadosVendas)        
    }else if(servico==2){

    }else if(servico==3){

    }
    return response
}