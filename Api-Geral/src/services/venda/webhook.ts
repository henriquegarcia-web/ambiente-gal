import { Listagem } from "../webhook/listagem"

export const DispararEvento = async (idProdutor:number,evento:number,data:any) =>{
  try{
    let listagemEventos = await Listagem({idConta:idProdutor},{})
    let listEventos = listagemEventos?.list
  
    listEventos = listEventos?.filter((item:any)=>item.evento.some((item:any)=>item.id==evento))

    if(listEventos?.length>0){
        listEventos.map((item:any)=>{
          console.log({item})
            fetch(`${item.url}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then( async (response) => {
                console.log('Resposta:', await response.json());
              })
              .then(data => {
                console.log('Resposta:', data);
              })
              .catch((error:any) => {
                console.log('Erro:', error);
              });
        })
    }else{
        return{status:false}
    }
    return{status:true}
  }catch(error){
    console.log(error)
    return{status:true}
  }
    
}