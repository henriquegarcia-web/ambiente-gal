import { Venda } from "../../models/venda"

export const Status = async (status:any,id:any,idTransacao:any) =>{
    await Venda.update({status:status},{where:{...(id && {id}),...(idTransacao && {idTransacao})}})
    return true
}