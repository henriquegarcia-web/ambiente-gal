import { Listagem } from "../pixel/listagem"

export const ValidaPixel = async (pixels:string,idProdutor:number) =>{
    return new Promise ( async(resolve,reject)=>{
        let listagem:any = await Listagem({idConta:idProdutor})
        if(listagem?.list?.length>0 && (pixels )){
            let list = listagem?.list
            let contador = 0
           
            let pixel =  pixels?.split('-')
            let status = false
            list.map((item:any)=>{
           
                if(pixel.includes(`${item.id}`) ){
                    contador = contador +1
                    status = true
                }else{
                    status = false
                }
                if(pixel.length==contador){
                    resolve(true)
                }
            })
        }else{
            resolve(true)

        }
    })
    
}
