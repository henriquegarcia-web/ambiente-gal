import { Listagem } from "../modulo/listagem"

export const ValidaModulo = async (idModulo:number,idProdutor:number) =>{
    let listModulo:any = await Listagem({idConta:idProdutor},{id:idModulo})
    if(listModulo?.list?.length>0){
        return true
    }else{
        return false
    }
}