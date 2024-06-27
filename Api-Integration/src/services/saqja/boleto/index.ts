import { Times } from "../../../utils/time";

export const Boleto = async (body: any) => {
    let { valor, cpf, nome } = body
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
                amount: valor,
                dueDate: time.dataAtualNew,
                document: cpf,
                name: nome,
                partnerConciliationId: "2",
                cnpj: "50992794000195",

              
            })
        };
        fetch('https://pix-service.saqja.com/api/boleto', options)
            .then((response: any) => response.json())
            .then((response: any) => { resolve(response) })
            .catch((err: any) => { resolve(err) });
    })
}