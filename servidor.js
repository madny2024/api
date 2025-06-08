// Importa as bibliotecas necessárias
const express = require('express');
const fetch = require('node-fetch');

// Cria a aplicação do servidor
const app = express();

// ESSA LINHA ABAIXO JÁ ESTÁ CERTA, NÃO PRECISA MUDAR ✅
const PORTA = process.env.PORT || 3000;

const apiUrl = 'https://jonbet.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1';

// Cria o endpoint "/dados"
app.get('/dados', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API externa retornou o erro: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: 'Não foi possível buscar os dados da API externa.' });
  }
});


// ****** A MUDANÇA É EXATAMENTE AQUI EMBAIXO ******

// SEU CÓDIGO ATUAL PROVAVELMENTE ESTÁ ASSIM:
// app.listen(PORTA, () => {
//   console.log(`Servidor iniciado e escutando na porta ${PORTA}`);
// });


// SUBSTITUA PELA LINHA ABAIXO, ADICIONANDO '0.0.0.0'
app.listen(PORTA, '0.0.0.0', () => {
  console.log(`Servidor iniciado e escutando na porta ${PORTA}`);
});