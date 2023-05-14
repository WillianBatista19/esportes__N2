import axios from "axios";

// Função que retorna todos os jogadores com nome correspondente ao desejado
export function localizaJogador(jogador, ApiKey) {
    // Fazer uma solicitação GET para a APIFootball para obter informações dos jogadores
    axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${jogador}&APIkey=${ApiKey}`)
    .then(response => {
        console.log(response);
        // Verificar se a resposta tem pelo menos um jogador
        if (response.data.length > 0) {
            const resultado = [];
            // console.log(response.data) // Retorna todos os dados do Jogador no formato padrão da API
            // Navega em todos os resultados retornados pela API
            response.data.forEach(jogador => {
                // Grava em um JSON as informações desejadas do jogador retornado
                const resposta = {
                    nome: jogador.player_name, // String
                    clube: jogador.team_name, // String
                    numero: jogador.player_number, // XX - int
                    posicao: jogador.player_type, // Forwards = Atacante || Midfielders = Meia, meio-campista || Defenders = Zagueiro; Líbero; Lateral.
                    urlImagem: jogador.player_image, // 150px X 150px
                    idade: jogador.player_age, // XX - int
                    nascimento: jogador.player_birthdate // YYYY-MM-DD
                }

                // Ajustando o JSON, informando o status de 'Sem dados' para campos vazios
                if (resposta.clube === '') {
                    resposta.clube = 'Sem dados';
                }
                if (resposta.numero === '') {
                    resposta.numero = 'Sem dados';
                }
                if (resposta.posicao === '') {
                    resposta.posicao = 'Sem dados';
                }
                if (resposta.urlImagem === '') {
                    resposta.urlImagem = 'Sem dados';
                }
                if (resposta.idade === '') {
                    resposta.idade = 'Sem dados';
                }
                if (resposta.nascimento === '') {
                    resposta.nascimento = 'Sem dados';
                }

                // Adiciona o JSON em um array
                resultado.push(resposta);
            });
            // Retorna o array de JSONs
            console.log(resultado)
            return resultado;
        } else {
            // Retorna se não for achado nenhum jogador com nome desejado
            console.log(`Nenhum jogador correspondente encontrado para "${jogador}".`);
            return (`Nenhum jogador correspondente encontrado para "${jogador}".`);
        }
    }).catch(error => {
        // Retorna erro
        console.log(error);
        return error;
    });
}

// Exemplo de utilização da função localizaJogador:
export const ApiKey = '783e6787ac50c4ed6e66910b34f4a245f81a0588abcaf7674f82b7fcef7bb4d5';
export const ApiKeyTeste = '751c992f2d845972bf932f489c142456784f17668a19a24de428157417a35ac5';
// localizaJogador('Neymar', ApiKey);