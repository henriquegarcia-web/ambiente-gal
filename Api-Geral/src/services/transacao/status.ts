import { Produtor } from "../../models/produtor"
import { Transacao } from "../../models/transacao"

export const Status = async (body:any) =>{
    let {id,status} = body
    let buscar = await Transacao.findOne({where:{id}})
    if(buscar?.id){
        buscar.status=status
        await buscar.save()
        if(status==2){
            let produtor = await Produtor.findOne({where:{id:buscar.idProdutor}})
            if(produtor?.id){
                if(buscar.tipoValor==1){
                    produtor.saldoDisponivel = produtor.saldoDisponivel - (buscar.valor)  
                }else{
                    produtor.valorRetido = produtor.valorRetido - (buscar.valor)  
                }
             
                await produtor.save()
            }
        }
        return{error:false,msg:'Transação modificada!'}
    }else{
        return{error:true,msg:'Transação não encontrada'}
    }
}