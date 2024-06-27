const crypto = require('crypto');


function sha256(input: string) {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
export const Compra = async ({id, pixels, email, link, valor, data,clientIp,clientUserAgent }: any) => {
  let time = new Date(data)
 
  // console.log('Step1',{  "user_data": {
  //   "ph": null,
  //   "em": sha256(email),
  //   "client_ip_address":clientIp,
  //   "client_user_agent":clientUserAgent
  // },})
  // console.log('Step2',{  "custom_data": {
  //   "value": (valor>0?valor:1),
  //   "currency": "BRL"
  // },},{   "event_source_url": `https://app.wolfypay.com/checkout-sale/${link}`,})
  try {
    if (pixels.length > 0) {
      pixels.map((item: any) => {
        if(item.tipo==3){
          if (item.idPixel && item.api) {
            fetch(`https://graph.facebook.com/v19.0/${item.idPixel}/events?access_token=${item.api}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "data": [{
                  "event_name": "Purchase",
                  "event_time": time,
                  "event_id": `${id}`,
                  "event_source_url": `https://app.wolfypay.com/checkout-sale/${link}`,
                  "action_source": "website",
                  "user_data": {
                    "ph": null,
                    "em": sha256(email),
                    "client_ip_address":clientIp,
                    "client_user_agent":clientUserAgent
                  },
                  "custom_data": {
                    "value": (valor>0?valor:1),
                    "currency": "BRL"
                  }
                }]
              })
            })
              .then(async (response) => {
                console.log('Resposta 1:', await response.json());
  
              })
              .then(data => {
                console.log('Resposta 2:', data);
  
              })
            .catch(error => {
              console.error('Erro 3:', error);
            });
          }
        }
     
      })
    }
    return true
  } catch (error) {
    console.log('Error')
    return true
  }





}