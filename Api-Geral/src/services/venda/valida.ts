import { Listagem } from "../checkout/listagem"

export const Valida = async (link:string) =>{
    let buscar = await Listagem({idConta:null},{link})
    if(buscar?.list?.length>0){
       return buscar
    }else{
        return []
    }
}