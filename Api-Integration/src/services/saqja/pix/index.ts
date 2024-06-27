export const Pix = (body: any) => {
    let { valor, celular, cpf, nome } = body
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Basic ${process.env.ApiSaqja}`
            },
            body: JSON.stringify({
                valor: valor,
                telefone: celular,
                cpf: cpf,
                nomeCliente:nome,
                partnerConciliationId: "2",
                cnpj: "50992794000195"
            })
        };
        fetch('https://pix-service.saqja.com/api/venda', options)
            .then((response: any) => response.json())
            .then((response: any) => { resolve(response) })
            .catch((err: any) => { resolve(err) });
    })
}