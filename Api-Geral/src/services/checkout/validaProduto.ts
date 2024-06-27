import { Listagem } from "../produto/listagem"

export const ValidaProduto = async (produto:string,idProdutor:number) =>{
    return new Promise( async(resolve,reject)=>{
        let listagem = await Listagem(null,0,idProdutor)
        let Listprodutos = listagem?.list
        let status = false
        if(produto || produto?.length>0){
            let list =  produto.split('-')
            let contador = 0
            list.map((item:any)=>{
                contador = contador + 1
                let buscar = Listprodutos.filter((prod:any)=>prod.id==Number(item))
                if((buscar.idProdutor == idProdutor )  ){
                    status = true
                }else{
                    buscar?.afiliacoes?.fillter((afiliacao:any)=>(afiliacao.idProdutor == idProdutor && afiliacao.status ))
                    if(buscar.length>0){
                        status = true
                    }else{
                        status = false
                    }
                }
                if(list.length==contador){
                    resolve(status)
                }
            })
        }else{
            resolve(false)
        }
    })
    
}