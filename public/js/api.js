const axios = require('axios');
const ApiKey = '783e6787ac50c4ed6e66910b34f4a245f81a0588abcaf7674f82b7fcef7bb4d5';
const jsonJogadores = [];
const jsonCoaches = []
const jsonClubes = [];
const jsonPartidas = [];

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
                    posicao: jogador.player_type, // Forwards = Atacante || Midfielders = Meio-campista || Defenders = Defesa
                    urlImagem: jogador.player_image, // 150px X 150px
                    nacionalidade: jogador.player_country,
                    jogosGanhos: jogador.player_duels_won,
                    jogosTotais: jogador.player_duels_total,
                    golsMarcados: jogador.player_goals,
                    cartoesAmarelos: jogador.player_red_cards,
                    cartoesVermelhos: jogador.player_yellow_cards
                    //idade: jogador.player_age, // XX - int
                    //nascimento: jogador.player_birthdate, // YYYY-MM-DD
                    //numero: jogador.player_number, // XX - int
                }

                // Ajustando o JSON, informando o status de 'Sem dados' para campos vazios
                if (resposta.clube == '') {
                    resposta.clube = 'Sem dados';
                }
                if (resposta.posicao == '') {
                    resposta.posicao = 'Sem dados';
                }
                else{
                    if (resposta.posicao == 'Forwards'){
                        resposta.posicao = 'Atacante';
                    }
                    if (resposta.posicao == 'Midfielders') {
                        resposta.posicao = 'Meio-campista';
                    }
                    if (resposta.posicao == 'Defenders') {
                        resposta.posicao = 'Defesa';
                    }
                }
                if (resposta.urlImagem == '') {
                    resposta.urlImagem = './img/padraoJogador.png';
                }
                if (resposta.nacionalidade == '') {
                    resposta.nacionalidade = 'Sem dados';
                }
                if (resposta.jogosGanhos == '') {
                    resposta.jogosGanhos = 'Sem dados';
                }
                if (resposta.jogosTotais == '') {
                    resposta.jogosTotais = 'Sem dados';
                }
                if (resposta.golsMarcados == '') {
                    resposta.golsMarcados = 'Sem dados';
                }
                if (resposta.cartoesAmarelos == '') {
                    resposta.cartoesAmarelos = 'Sem dados';
                }
                if (resposta.cartoesVermelhos == '') {
                    resposta.cartoesVermelhos = 'Sem dados';
                }
                // Adiciona o JSON em um array
                jsonJogadores.push(resposta);
            });
            // Retorna o array de JSONs
            console.log(jsonJogadores)
            return(jsonJogadores)
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
                clubesFiltrados.forEach(clube => {
                    
                    for (let i = 0; i < clube.players.length; i++) {
                        jsonJogadores.push(clube.players[i].player_name);
                    }
                    for (let i = 0; i < clube.coaches.length; i++) {
                        jsonCoaches.push(clube.coaches[i].coach_name);
                    }
                    
                    const resposta = {
                        nome: clube.team_name,
                        urlImagem: clube.team_badge,
                        jogadores: jsonJogadores,
                        tecnicos: jsonCoaches
                    }

                    if (resposta.nome == ''){
                        resposta.nome = 'Sem dados'
                    }
                    if (resposta.urlImagem == ''){
                        resposta.urlImagem = './img/padraoTime.png'
                    }
                    if (resposta.jogadores == ''){
                        resposta.jogadores = 'Sem dados'
                    }
                    if (resposta.tecnicos == ''){
                        resposta.tecnicos = 'Sem dados'
                    }
                    
                    jsonClubes.push(resposta);
                });
                     
                console.log(jsonClubes)
                return(jsonClubes)
            } else {
                console.log(`Nenhum clube encontrado correspondente ao nome '${nomeClube}'.`);
                return(`Nenhum clube encontrado correspondente ao nome '${nomeClube}'.`);
            }
        })
        .catch(error => {
            console.log(error);
            return(error);
        });
}

function eventos(dataInicial, datafinal) {
    axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${dataInicial}&to=${datafinal}&APIkey=${ApiKey}`)
    .then(response => {
        // Verificar se há eventos durante o período especificado
        if (response.data.length > 0) {
            // Exibir o nome e a data de cada evento
            response.data.forEach(evento => {
                const resposta = {
                    paisSede: evento.country_name,
                    estadioPartida: evento.match_stadium,
                    dataPartida: evento.match_date,
                    horaPartida: evento.match_time,
                    juizPartida: evento.match_referee,
                    timeCasaNome: evento.match_hometeam_name,
                    timeCasaPlacar: evento.match_hometeam_score,
                    timeCasaFormacao: evento.match_hometeam_system,
                    timeVisitanteNome: evento.match_awayteam_name,
                    timeVisitantePlacar: evento.match_awayteam_score,
                    timeVisitanteFormacao: evento.match_awayteam_system
                }

                if (resposta.paisSede == '') {
                    resposta.paisSede = 'Sem dados';
                }
                if (resposta.estadioPartida == '') {
                    resposta.estadioPartida = 'Sem dados';
                }
                if (resposta.dataPartida == '') {
                    resposta.dataPartida = 'Sem dados';
                }
                if (resposta.horaPartida == '') {
                    resposta.horaPartida = 'Sem dados';
                }
                if (resposta.juizPartida == '') {
                    resposta.juizPartida = 'Sem dados';
                }
                if (resposta.timeCasaNome == '') {
                    resposta.timeCasaNome = 'Sem dados';
                }
                if (resposta.timeCasaPlacar == '') {
                    resposta.timeCasaPlacar = 'Sem dados';
                }
                if (resposta.timeCasaFormacao == '') {
                    resposta.timeCasaFormacao = 'Sem dados';
                }
                if (resposta.timeVisitanteNome == '') {
                    resposta.timeVisitanteNome = 'Sem dados';
                }
                if (resposta.timeVisitantePlacar == '') {
                    resposta.timeVisitantePlacar = 'Sem dados';
                }
                if (resposta.timeVisitanteFormacao == '') {
                    resposta.timeVisitanteFormacao = 'Sem dados';
                }

                jsonPartidas.push(resposta);
            });
            console.log(jsonPartidas)
            return(jsonPartidas)
        } else {
            console.log(`Nenhum evento encontrado entre ${dataInicial} e ${datafinal}.`);
            return(`Nenhum evento encontrado entre ${dataInicial} e ${datafinal}.`)
        }
    })
    .catch(error => {
        console.log(error);
        return(error)
    });
}

// localizaJogador('Cristiano'); // - OK
// clubes("Barcel"); // - OK
// eventos("2023-05-07", "2023-05-08") // - OK

