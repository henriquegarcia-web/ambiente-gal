import dotenv from 'dotenv'
dotenv.config()
export const EditarRecebedor = async (body:any) =>{
    let {id,type,titular,banco,agencia,conta, contadig} = body
    return new Promise((resolve,reject)=>{
        const options = {
            method: 'PUT',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${process.env.ApiPagarme}`
            },
            body: JSON.stringify({
                default_bank_account: {
                    holder_name: titular,
                    bank:banco,
                    branch_number: agencia,
                    account_number:conta,
                    account_check_digit: contadig,
                    holder_type: type==1?'individual':'company'
                  } })
          };
          
          fetch(`https://api.pagar.me/core/v5/recipients/${id}`, options)
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(err => resolve(err));
    })
    
}