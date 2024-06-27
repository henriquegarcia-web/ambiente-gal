import { Times } from "../../../utils/time";

export const CartaoCredito = async (body: any) => {
    let { nome, celular, cpf, valor,titular,  cardNumero, cardMes, cardAno, cardCvv, parcelas} = body
    let time =await Times()

    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Basic ${process.env.ApiSaqja}`
            },
            body: JSON.stringify({
                    partnerConciliationId: "2",
                    partnerId: "50992794000195",
                    cnpj: "50992794000195",
                    amount: valor,
                    chargeDay: time.data,
                    installments:parcelas,
                    creditCardDataPayment: {
                        customer: {
                            name: nome,
                            documentNumber:cpf,
                            phoneNumber: celular
                        },
                        creditCard: {
                            number: cardNumero,
                            holder:titular,
                            expiresAt:`${cardAno}-${cardMes}`,
                            cvv: cardCvv
                        }
                    },
                    creditCardLinkPayment: {
                        customer: {
                            name: nome,
                            documentNumber: cpf,
                            phoneNumber:celular
                        }
                    },
                    additionalInfo: ""


                })
        };
        fetch('https://pix-service.saqja.com/api/cartao-credito/parcelado', options)
            .then((response: any) => response.json())
            .then((response: any) => { 
                resolve(response) 
            })
            .catch((err: any) => { resolve(err) });
    })
}