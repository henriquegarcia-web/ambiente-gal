import dotenv from 'dotenv'
dotenv.config()
export const CadastroRecebedor = async (body:any) =>{
    let {nome,email,documento,type,banco,agencia,conta, contadig} = body
    return new Promise((resolve,reject)=>{
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json', 
                'content-type': 'application/json',
                authorization: `Basic ${process.env.ApiPagarme}`
            },
            body: JSON.stringify({
              default_bank_account: {
                holder_name: nome,
                bank:banco,
                branch_number: agencia,
                account_number:conta,
                account_check_digit: contadig,
                holder_type: type==1?'individual':'company',
                type:"checking"
              },
              transfer_settings: {transfer_enabled: false, transfer_interval: "Daily",transfer_day:0},
              name:nome,
              email: email,
              description: '',
              document: documento,
              type: type==1?'individual':'company'
            })
          };
          
          fetch('https://api.pagar.me/core/v5/recipients', options)
            .then((response:any) => response.json())
            .then((response:any) => {resolve(response)})
            .catch((err:any) => {resolve(err)});
    })
    
}