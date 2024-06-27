import dotenv from 'dotenv'
dotenv.config()
export const Cancelar = async (body:any) =>{
    let {id} = body
    return new Promise((resolve,reject)=>{
        const options = {
            method: 'DELETE',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${process.env.ApiPagarme}`
            },
            body: JSON.stringify({cancel_pending_invoices: true})
          };
          
          fetch(`https://api.pagar.me/core/v5/subscriptions/${id}`, options)
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => resolve(err));
    })
   
}