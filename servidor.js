// Importa as bibliotecas necessárias
const express = require('express');
const fetch = require('node-fetch');

// Cria a aplicação do servidor
const app = express();

// Define a porta usando a variável de ambiente da Render ou 3000 para teste local
const PORTA = process.env.PORT || 3000;

// URL da API externa que queremos acessar
const apiUrl = 'https://jonbet.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1';

// Cria o endpoint "/dados" que o navegador vai acessar
app.get('/dados', async (req, res) => {
  console.log('Recebemos uma requisição na rota /dados, tentando buscar dados externos...');

  try {
    // ---- Início da Correção ----

    // Cria um objeto de opções para "disfarçar" nosso pedido de um navegador
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    // Faz o pedido para a API externa usando as opções que criamos
    const response = await fetch(apiUrl, options);

    // ---- Fim da Correção ----


    // Se a resposta da API externa não for OK (ex: erro 404, 500), lança um erro
    if (!response.ok) {
      // Adicionamos o status do erro para um debug melhor
      throw new Error(`A API externa respondeu com o status: ${response.status}`);
    }

    // Converte a resposta em JSON
    const data = await response.json();

    // Envia os dados como resposta para quem acessou nosso link
    res.json(data);

  } catch (error) {
    // Em caso de qualquer erro no processo, loga no console da Render e envia a mensagem de erro
    console.error("Ocorreu um erro no bloco try:", error);
    res.status(500).json({ erro: 'Não foi possível buscar os dados da API externa.' });
  }
});

// Inicia o servidor para ele começar a "escutar" por requisições
// Adicionamos '0.0.0.0' para garantir que funcione na Render
app.listen(PORTA, '0.0.0.0', () => {
  console.log(`Servidor iniciado e escutando na porta ${PORTA}`);
});
