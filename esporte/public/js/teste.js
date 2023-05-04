const axios = require('axios');
const ApiKey = '783e6787ac50c4ed6e66910b34f4a245f81a0588abcaf7674f82b7fcef7bb4d5';
const resultado = [];

// Função que retorna todos os jogadores com nome correspondente ao desejado
function localizaJogador(jogador) {
    // Fazer uma solicitação GET para a APIFootball para obter informações dos jogadores
    axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${jogador}&APIkey=${ApiKey}`)
    .then(response => {
        // Verificar se a resposta tem pelo menos um jogador
        if (response.data.length > 0) {
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
                if (resposta.clube == '') {
                    resposta.clube = 'Sem dados';
                }
                if (resposta.numero == '') {
                    resposta.numero = 'Sem dados';
                }
                if (resposta.posicao == '') {
                    resposta.posicao = 'Sem dados';
                }
                if (resposta.urlImagem == '') {
                    resposta.urlImagem = 'Sem dados';
                }
                if (resposta.idade == '') {
                    resposta.idade = 'Sem dados';
                }
                if (resposta.nascimento == '') {
                    resposta.nascimento = 'Sem dados';
                }

                // Adiciona o JSON em um array
                resultado.push(resposta);
            });
            // Retorna o array de JSONs
            console.log(resultado)
            return(resultado)
        } else {
            // Retorna se não for achado nenhum jogador com nome desejado
            console.log(`Nenhum jogador correspondente encontrado para "${jogador}".`);
            return(`Nenhum jogador correspondente encontrado para "${jogador}".`);
        }
    }).catch(error => {
        // Retorna erro
        console.log(error);
        return(error);
    });
}

               

function localizaPais(nomeDoPais) {
    // Fazer uma solicitação GET para a APIFootball para obter uma lista de todos os países disponíveis
    axios.get(`https://apiv3.apifootball.com/?action=get_countries&APIkey=${ApiKey}`)
    .then(response => {
        // Filtrar os países que contêm a parte do nome que estamos procurando
        const paisesEncontrados = response.data.filter(pais => pais.country_name.toLowerCase().includes(nomeDoPais.toLowerCase()));
        if (paisesEncontrados.length > 0) {
            console.log(`Países encontrados com "${nomeDoPais}" no nome:`);
            paisesEncontrados.forEach(pais => console.log(`- ID: ${pais.country_id} | Nome: ${pais.country_name} | Logo: ${pais.country_logo}`));
        } else {
            console.log(`Nenhum país encontrado com "${nomeDoPais}" no nome.`);
        }
    })
    .catch(error => {
        console.log(error);
});
}
/* Paises possiveis:
- England
    id: 44
    url logo: https://apiv3.apifootball.com/badges/logo_country/44_england.png
- France
    id: 3
    url logo: https://apiv3.apifootball.com/badges/logo_country/3_france.png
*/    

function localizaCampeonatos() {
    //${ApiKey}

    for (idPais = 1; idPais <= 200; idPais++) {
        //console.log(idPais);
        axios.get(`https://apiv3.apifootball.com/?action=get_leagues&country_id=${idPais}&APIkey=${ApiKey}`)
        .then(response => {
            // Verificar se a resposta tem pelo menos uma competição
            if (response.data.length > 0) {
                // Exibir o nome e ID de cada competição
                console.log(`Competições do país com ID ${idPais}:`);
                response.data.forEach(competicao => {
                    console.log(`- ${competicao.league_name} (ID: ${competicao.league_id})`);
                });
            } else {
                //console.log(`Nenhuma competição encontrada para o país com ID ${idPais}.`);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}
//- Premier League (ID: 177)
//- Non League Premier (ID: 149)

function clubes(nomeClube) {
    //${ApiKey}
    //for (idLiga = 1; idLiga <= 1000; idLiga++) {
        // Fazer uma solicitação GET para a APIFootball para obter os clubes
        axios.get(`https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${ApiKey}`)
        .then(response => {
            // Filtrar os clubes que correspondem ao nome desejado
            const clubesFiltrados = response.data.filter(clube => clube.team_name.startsWith(nomeClube));

            // Verificar se há clubes que correspondem ao nome
            if (clubesFiltrados.length > 0) {
                // Exibir o nome e o ID de cada clube correspondente
                console.log(`Club(es) correspondente(s) ao nome '${nomeClube}':`);
                clubesFiltrados.forEach(clube => {
                    console.log(`- ${clube.team_name} (ID: ${clube.team_key})`);
                });
            } else {
                //console.log(`Nenhum clube encontrado correspondente ao nome '${nomeClube}'.`);
            }
        })
        .catch(error => {
            //console.log(error);
        });
    //}
}

function localizaPaises() {
//    https://apiv3.apifootball.com/?action=get_countries&APIkey=xxxxxxxxxxxxxx
    axios.get(`https://apiv3.apifootball.com/?action=get_countries&APIkey=${ApiKey}`)
    .then(response => {
        // Verificar se a resposta tem pelo menos uma competição
        if (response.data.length > 0) {
            // Exibir o nome e ID de cada competição
            response.data.forEach(pais => {
                console.log(`- ${pais.country_name} (ID: ${pais.country_logo})`);
            });
        } else {
            //console.log(`Nenhuma competição encontrada para o país com ID ${idPais}.`);
        }
    })
    .catch(error => {
        console.log(error);
    });  
}

// localizaCampeonatos();
// clubes("Real");
// localizaPais('e');
// localizaJogador('Neymar');
localizaPaises();
