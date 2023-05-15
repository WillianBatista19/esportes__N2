import styles from './homecss.module.css'
import jogadorPadrao from '../../images/padraoJogador.png'

import axios from "axios";

import React, { useState } from 'react';

// import { ApiKey, ApiKeyTeste } from '../js/teste';
import { ApiKeyTeste } from '../js/teste';

function Home() {

    const [jogador, setJogador] = useState('');
    const [resultados, setResultados] = useState([]);
    const [quantidadeResultados, setQuantidadeResultados] = useState(4);

    const [nomeClube, setNomeClube] = useState('');
    const [resultadosTimes, setResultadosTimes] = useState([]);
    const [quantidadeResultadosTime, setQuantidadeResultadosTime] = useState(4);

    const getJogadores = (name, apiKey) => {
        // Fazer uma solicitação GET para a APIFootball para obter informações dos jogadores
        axios.get(`https://apiv3.apifootball.com/?action=get_players&player_name=${name}&APIkey=${apiKey}&search=${name}`)
            .then(response => {
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
                    setResultados(resultado)
                } else {
                    // Retorna se não for achado nenhum jogador com nome desejado
                    console.log(`Nenhum jogador correspondente encontrado para "${jogador}".`);
                    return (`Nenhum jogador correspondente encontrado para "${jogador}".`);
                }
            }).catch(error => {
                // Retorna erro
                console.log(error);
            });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        getJogadores(jogador, ApiKeyTeste)
    }

    const handleChange = (event) => {
        setJogador(event.target.value);
    }

    const handleTimeChange = (value) => {
        setNomeClube(value);
    };

    const handleTimeSubmit = (event) => {
        event.preventDefault();

        if (nomeClube.trim() === '') {
            return;
        }

        axios
            .get(`https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${ApiKeyTeste}`)
            .then((response) => {
                const clubesFiltrados = response.data.filter((clube) =>
                    clube.team_name.startsWith(nomeClube)
                );

                if (clubesFiltrados.length > 0) {
                    const resultados = clubesFiltrados.map((clube) => ({
                        nome: clube.team_name || 'Sem dados',
                        urlImagem: clube.team_badge || './img/padraoTime.png',
                        jogadores: clube.players.map((jogador) => jogador.player_name),
                        tecnicos: clube.coaches.map((tecnico) => tecnico.coach_name),
                    }));

                    setResultadosTimes(resultados);
                } else {
                    console.log(`Nenhum clube encontrado correspondente ao nome '${nomeClube}'.`);
                    setResultadosTimes([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setResultadosTimes([]);
            });
    };

    return (
        <>
            <main>
                <div>
                    <div className={styles.intro_container}>
                        <form className={styles.pesquisa_container} onSubmit={handleSubmit}>
                            <label className={styles.search_bar}>
                                <input className={styles.campo_pesquisa} type="text" value={jogador} onChange={handleChange} placeholder='Digite o nome do jogador aqui...' />
                                <input className={styles.button} type="submit" value={"Buscar"} />
                            </label>
                        </form>
                        {!resultados &&
                            <p>Nenhum resultado encontrado.</p>
                        }
                    </div>

                    <div className={styles.resultados}>
                        {resultados && resultados.length > 0 && (
                            <>
                                <ul>
                                    {resultados.slice(0, quantidadeResultados).map((resultado, index) => (
                                        <li key={index}>
                                            <p>Nome: {resultado.nome}</p>
                                            <p>Clube: {resultado.clube}</p>
                                            <p>Nº: {resultado.numero}</p>
                                            <p>Posição: {resultado.posicao}</p>
                                            <p>Idade: {resultado.idade}</p>
                                            <p>Nascimento: {resultado.nascimento}</p>
                                            <img src={resultado.urlImagem} alt={resultado.nome} onError={(e) => e.target.src = jogadorPadrao} />
                                        </li>
                                    ))}
                                </ul>

                                {resultados.length > quantidadeResultados && (
                                    <button onClick={() => setQuantidadeResultados(quantidadeResultados + 4)}>Mostrar mais</button>
                                )}
                            </>
                        )}

                        {!resultados && resultados.length === 0 && <p>Nenhum resultado encontrado.</p>}
                    </div>
                </div>

                <div>
                    <div className={styles.intro_containerTimes}>
                        <p className={styles.intro_p}>Pesquise o Clube aqui:</p>
                        <form className={styles.pesquisa_container} onSubmit={handleTimeSubmit}>
                            <label className={styles.search_bar}>
                                <input
                                    className={styles.campo_pesquisa}
                                    type="text"
                                    value={nomeClube}
                                    onChange={(e) => handleTimeChange(e.target.value)}
                                    placeholder="Digite o nome com a PRIMEIRA LETRA MAIÚSCULA..."
                                />
                                <input className={styles.button} type="submit" value="Buscar" />
                            </label>
                        </form>
                        {!resultadosTimes.length === 0 && <p>Nenhum resultado encontrado.</p>}
                    </div>

                    <div className={styles.resultadosTime}>
                        {resultadosTimes.length > 0 && (
                            <>
                                <ul className={styles.resultadosUl}>
                                    {resultadosTimes.slice(0, quantidadeResultadosTime).map((clube, index) => (
                                        <li key={index}>
                                            <p className={styles.resultadosUlP}>Nome: {clube.nome}</p>
                                            <img className={styles.resultadosUlImg} src={clube.urlImagem} alt="Escudo do Clube" />
                                            <p className={styles.resultadosUlP}>Jogadores:</p>
                                            <ul className={styles.jogadoresList}>
                                                {clube.jogadores.map((jogador, jogadorIndex) => (
                                                    <li key={jogadorIndex}>{jogador}</li>
                                                ))}
                                            </ul>
                                            <p className={styles.resultadosUlP}>Tecnicos:</p>
                                            <ul className={styles.tecnicosList}>
                                                {clube.tecnicos.map((tecnico, tecnicoIndex) => (
                                                    <li key={tecnicoIndex}>{tecnico}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                                {resultadosTimes.length > quantidadeResultadosTime && (
                                    <button onClick={() => setQuantidadeResultadosTime(quantidadeResultadosTime + 4)}>
                                        Mostrar mais
                                    </button>
                                )}
                            </>
                        )}

                        {!resultadosTimes.length === 0 && <p>Nenhum resultado encontrado.</p>}
                    </div>
                </div>

            </main >

            <footer className={styles.footer_container}>
                <div className={styles.footer_bar}>
                    <p>Copyright ® 2023 David, Vicente e Willian. Projeto educacional WEB1</p>
                </div>
            </footer>
        </>
    )
}

export default Home;