// Passo 1: Importar a biblioteca que acabamos de instalar
const fetch = require('node-fetch');

// A URL da API que queremos acessar
const apiUrl = 'https://jonbet.bet.br/api/singleplayer-originals/originals/roulette_games/recent/1';

// Criamos uma função assíncrona para buscar os dados
async function obterDadosDaApi() {
  console.log('Iniciando busca de dados...');

  try {
    // Passo 2: Fazer a requisição para a API
    const response = await fetch(apiUrl);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      // Se não, lança um erro com o status da resposta
      throw new Error(`A requisição falhou com status: ${response.status}`);
    }

    // Passo 3: Converter a resposta para JSON
    const data = await response.json();

    // Passo 4: Exibir os dados no console do servidor
    console.log('Dados recebidos com sucesso:');
    console.log(data);

    // Daqui para frente, você pode manipular os dados ou salvá-los
    return data;

  } catch (error) {
    // Captura e exibe qualquer erro que ocorra
    console.error('Ocorreu um erro no processo:', error.message);
  }
}

// Executa a função para buscar os dados
obterDadosDaApi();