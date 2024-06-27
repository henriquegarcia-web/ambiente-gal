import React, { useEffect } from 'react';
// import ReactPixel from 'react-facebook-pixel'


const options = {
  autoConfig: true,
  debug: false,
}
const FacebookPixel = ({ pixelId,valor,tipo }) => {

  useEffect(() => {
  
    const ReactPixel = require('react-facebook-pixel').default;
    if (typeof window !== 'undefined') {
        // Importar ReactPixel apenas se window estiver definido
        // Inicialização do Pixel do Facebook
        ReactPixel.init(pixelId, options);
        // Rastrear visualização de página
        if(tipo=='Outros'){
          ReactPixel.pageView();
        }
        if(tipo=='Outros'){
          ReactPixel.track('InitiateCheckout', {
            // Parâmetros opcionais que você deseja passar
            value: valor, // Valor total do checkout
            currency: 'BRL', // Moeda (Real brasileiro)
          });
        }
       
        if(tipo=='Compra'){
          ReactPixel.track('Purchase', {
            // Parâmetros opcionais que você deseja passar
            value: valor, // Valor total do checkout
            currency: 'BRL', // Moeda (Real brasileiro)
          });
        }
      
    
      }

  }, [pixelId]);

  return null; // Esta função não renderiza nada na árvore de componentes
};

export default FacebookPixel;
