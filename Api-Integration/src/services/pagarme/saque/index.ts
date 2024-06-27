import dotenv from 'dotenv'
dotenv.config()
export const Saque = async (body:any) =>{
    let {idRecebedor,valor} = body
    let amount =  valor.replace(/\D/g, '');
    return new Promise((resolve,reject)=>{
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  authorization: `Basic ${process.env.ApiPagarme}`
                },
                body: JSON.stringify({amount: amount})
              };
              fetch(`https://api.pagar.me/core/v5/recipients/${idRecebedor}/withdrawals`, options)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(err => resolve(err))})
}