import { Listagem } from "../areaMembro/listagem"

export const ValidaAreaMembro = async (id:number,idProdutor:number) =>{
    let listagem:any = await Listagem({idConta:idProdutor},{id})
    if(listagem?.list?.length>0){
        return true
    }else{
        return false
    }
}