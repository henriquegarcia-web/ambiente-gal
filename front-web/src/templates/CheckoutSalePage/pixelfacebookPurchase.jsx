const crypto = require('crypto');
function sha256(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
  }
export const Compra = ({token,idPixel,email,link,valor,data}) =>{
    let time = new Date(data)
    fetch(`https://graph.facebook.com/v19.0/${idPixel}/events?access_token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "data": [{
            "event_name": "Purchase",
            "event_time": time,
            "event_id": "event_id",
            "event_source_url": `https://app.wolfypay.com/checkout-sale/${link}`,
            "action_source": "website",
            "user_data": {
              "ph": null,
              "em": sha256(email),
            },
            "custom_data": {
              "value": valor,
              "currency": "BRL"
            }
          }]
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar a solicitação');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta:', data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
}