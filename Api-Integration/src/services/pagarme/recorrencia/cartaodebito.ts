import dotenv from 'dotenv'
dotenv.config()
export const CartaoDebito = async (dados:any) =>{
    let {checkout,intevalo,parcelas,pais,estado,cidade,cep,rua,nome,type,email,documento,dataNascimento,titular,numerocartao,mes,ano,cvv,valor} =dados
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
              payment_method: 'debit_card',
              interval: 'month',
              currency:'BRL',
              minimum_price: null,
              interval_count:intevalo,
              billing_type: 'prepaid',
              installments: parcelas,
              customer: {
                address: {
                  country: 'BR',
                  state: estado,
                  city: cidade,
                  zip_code:cep,
                  line_1: rua
                },
                name: nome,
                type:type==1?'individual':'company',
                email: email,
                document: documento,
                document_type: type==1?'CPF':'CNPJ',
                birthdate:dataNascimento
              },
              card: {
                number:numerocartao,
                holder_name: titular,
                exp_month: mes,
                exp_year: ano,
                cvv: cvv
              },
              pricing_scheme: {scheme_type: 'Unit',price:amount},
              quantity: null,
              statement_descriptor: checkout,
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