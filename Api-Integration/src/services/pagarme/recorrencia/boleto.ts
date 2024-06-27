import dotenv from 'dotenv'
dotenv.config()
export const Boleto = async (dados:any) =>{
    let {checkout,pais,estado,cidade,cep,rua,nome,email,documento,dataNascimento,valor} =dados
    let amount:any = parseInt(valor).toFixed(2)
    amount = amount.replace(/\D/g, '');
    amount = Number(amount)
   
    return new Promise( async (resolve,reject)=>{
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${process.env.ApiPagarme}`
            },
            body: JSON.stringify({
              payment_method: 'boleto',
              interval: 'month',
              currency:'BRL',
              minimum_price: amount,
              capture:true,
              billing_type: 'prepaid',
              customer: {
                address: {
                  country: 'BR',
                  state: estado,
                  city: cidade,
                  zip_code:cep,
                  line_1: rua
                },
                name: nome,
                type:documento.length<=14?'individual':'company',
                email: email,
                document: documento,
                document_type: documento.length<=14?'CPF':'CNPJ',
                birthdate:dataNascimento
              },
              pricing_scheme: {scheme_type: 'Unit',price:amount},
              quantity: 1,
              statement_descriptor: checkout,
              boleto_due_days:3,
              items: [
                {
                  pricing_scheme: {scheme_type: 'Unit',price:amount},
                  quantity: '1',
                  description: checkout,
                  name: checkout
                }
              ]
            })
          };
          
          fetch('https://api.pagar.me/core/v5/subscriptions', options)
            .then(response => response.json())
            .then(response => resolve(response) )
            .catch(err => resolve(err) );
    })
   
}