// Importa as bibliotecas necessárias
const express = require('express');
const fetch = require('node-fetch');
// -> NOVO: Importa a biblioteca para o proxy
const HttpsProxyAgent = require('https-proxy-agent');

const app = express();
const PORTA = process.env.PORT || 3000;
const apiUrl = 'https://jonbet.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1';

// -> NOVO: Configuração do Proxy (este é um proxy público e pode ser instável)
const proxyUrl = '200.255.88.23:80';
const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent(proxyUrl);


app.get('/dados', async (req, res) => {
  console.log('Recebemos uma requisição, tentando buscar dados via proxy do Brasil...');

  try {
    const options = {
      // -> NOVO: Adiciona o "agent" do proxy nas opções
      agent: proxyAgent,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`A API externa respondeu com o status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Ocorreu um erro no bloco try:", error);
    res.status(500).json({ erro: 'Não foi possível buscar os dados da API externa.' });
  }
});


app.listen(PORTA, '0.0.0.0', () => {
  console.log(`Servidor iniciado e escutando na porta ${PORTA}`);
});
