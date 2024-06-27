// Obrigado.js
import React from 'react';
import CheckIcon from '@mui/icons-material/Check'; // Importe o ícone de check do MUI

const Obrigado = () => {
  return (
    <div style={containerStyle}>
      <div style={iconCheckStyle}><CheckIcon fontSize="large" /></div>
      <h1 style={titleStyle}>Obrigado!</h1>
      <p style={textStyle}>Compra realizada. Seu pedido foi recebido com sucesso.</p>
    </div>
  );
}

const containerStyle = {
  textAlign: 'center',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const iconCheckStyle = {
  width: '80px',
  height: '80px',
  margin: '0 auto 20px',
};

const titleStyle = {
  color: '#333',
};

const textStyle = {
  color: '#666',
};

export default Obrigado;
