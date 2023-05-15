import styles from './homecss.module.css'
import barcelona_icon from '../../images/barcelona icon.png'
import manchester_icon from '../../images/manchester logo.png'
import milan_icon from '../../images/milan logo.png'
import realMadrid_icon from '../../images/real madrid logo.png'
import jogadorPadrao from '../../images/padraoJogador.png'

import axios from "axios";

import React, { useState } from 'react';
import Modal from '../modal';

// import { ApiKey, ApiKeyTeste } from '../js/teste';
import { ApiKeyTeste } from '../js/teste';

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jogador, setJogador] = useState('');
    const [resultados, setResultados] = useState([]);
    const [quantidadeResultados, setQuantidadeResultados] = useState(4);

    const [time, settime] = useState('');
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

    // const getTimes = (nomeTime, apiKey) => {
    //     axios
    //       .get(`https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${apiKey}`)
    //       .then((response) => {
    //         const timesFiltrados = response.data.filter((time) =>
    //           time.team_name.toLowerCase().startsWith(nomeTime.toLowerCase())
    //         );

    //         if (timesFiltrados.length > 0) {
    //           const resultado = timesFiltrados.slice(0, 3).map((time) => {
    //             const jogadores = time.players.map((jogador) => jogador.player_name);
    //             const tecnicos = time.coaches.map((tecnico) => tecnico.coach_name);

    //             const resposta = {
    //               nome: time.team_name,
    //               urlImagem: time.team_badge,
    //               jogadores: jogadores.length > 0 ? jogadores : 'Sem dados',
    //               tecnicos: tecnicos.length > 0 ? tecnicos : 'Sem dados',
    //             };

    //             return resposta;
    //           });
    //           setResultados(resultado);
    //         } else {
    //           console.log(`Nenhum time encontrado correspondente ao nome '${nomeTime}'.`);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };

    const getTimes = (nomeTime, apiKey) => {
        axios
            .get(`https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${apiKey}`)
            .then((response) => {
                const timesFiltrados = response.data;

                if (timesFiltrados.length > 0) {
                    const resultado = timesFiltrados.slice(0, 3).map((time) => {
                        const jogadores = time.players.map((jogador) => jogador.player_name);
                        const tecnicos = time.coaches.map((tecnico) => tecnico.coach_name);

                        const resposta = {
                            nome: time.team_name,
                            urlImagem: time.team_badge,
                            jogadores: jogadores.length > 0 ? jogadores : 'Sem dados',
                            tecnicos: tecnicos.length > 0 ? tecnicos : 'Sem dados',
                        };

                        return resposta;
                    });
                    setResultadosTimes(resultado);
                } else {
                    console.log(`Nenhum time encontrado correspondente ao nome '${nomeTime}'.`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getJogadores(jogador, ApiKeyTeste)
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    const handleChange = (event) => {
        setJogador(event.target.value);
    }

    const handleTimeSubmit = (event) => {
        event.preventDefault();
        getTimes(time, ApiKeyTeste)
    }

    const handleTimeChange = (event) => {
        settime(event.target.value);
    }




    // const BuscaTimes = () => {
    //     const [time, setTime] = useState('');
    //     const [resultados, setResultados] = useState([]);

    //     const handleSubmitTime = (event) => {
    //       event.preventDefault();
    //       getTimes(time, ApiKeyTeste);
    //     };

    //     const handleChangeTime = (event) => {
    //       setTime(event.target.value);
    //     }; 
    // }

    return (
        <>
            <main>
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

                <form className={styles.pesquisa_container} onSubmit={handleTimeSubmit}>
                    <label className={styles.search_bar}>
                        <input
                            className={styles.campo_pesquisa}
                            type="text"
                            value={time}
                            onChange={handleTimeChange}
                            placeholder="Digite o nome do time aqui..."
                        />
                        <input className={styles.button} type="submit" value={"Buscar"} />
                    </label>
                </form>

                <div className={styles.resultados}>
                    {resultadosTimes && resultadosTimes.length > 0 && (
                        <>
                            <ul>
                                {resultadosTimes.slice(0, quantidadeResultadosTime).map((resultado, index) => (
                                    <li key={index}>
                                        <p>Nome do Time: {resultado.team_name}</p>
                                        <p>País: {resultado.pais}</p>
                                        <p>Escudo: {resultado.escudo}</p>
                                    </li>
                                ))}
                            </ul>

                            {resultadosTimes.length > quantidadeResultadosTime && (
                                <button onClick={() => setQuantidadeResultadosTime(quantidadeResultadosTime + 4)}>Mostrar mais</button>
                            )}
                        </>
                    )}

                    {!resultadosTimes && resultadosTimes.length === 0 && <p>Nenhum resultado encontrado.</p>}
                </div>


                {/* <div className={styles.intro_container}>
                    <form className={styles.pesquisa_container} onSubmit={handleSubmit}>
                        <label className={styles.search_bar}>
                            <input
                                className={styles.campo_pesquisa}
                                type="text"
                                value={jogador}
                                onChange={handleChange}
                                placeholder="Digite o nome do jogador aqui..."
                            />
                            <input className={styles.button} type="submit" value={"Buscar"} />
                        </label>
                    </form>
                    {!resultados && !resultadosTimes && <p>Nenhum resultado encontrado.</p>}
                    {resultados && resultados.length > 0 && (
                        <div className={styles.resultados}>
                            <h2>Resultados da pesquisa de jogadores</h2>
                            <ul>
                                {resultados.slice(0, 5).map((item) => (
                                    <li key={item.id}>{item.nome}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div> */}

                {/* <div>
                    <form onSubmit={handleChangeTime}>
                        <label>
                            Nome do time:
                            <input type="text" value={time} onChange={handleChangeTime} />
                        </label>
                        <button type="submit">Buscar</button>
                    </form>

                    {resultados.length > 0 && (
                        <div>
                            {resultados.map((resultado) => (
                                <div key={resultado.nome}>
                                    <h2>{resultado.nome}</h2>
                                    <img src={resultado.urlImagem} alt={`Escudo do ${resultado.nome}`} />
                                    <h3>Jogadores:</h3>
                                    <ul>
                                        {resultado.jogadores.map((jogador) => (
                                            <li key={jogador}>{jogador}</li>
                                        ))}
                                    </ul>
                                    <h3>Técnicos:</h3>
                                    <ul>
                                        {resultado.tecnicos.map((tecnico) => (
                                            <li key={tecnico}>{tecnico}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div> */}

                {/* modal */}
                <dialog className={styles.modal}>
                    <h2>Estatisticas</h2>

                    <p className={styles.jogador_p}>Jogos disputados: <span className={styles.jogos_disputados}></span> </p>
                    <p className={styles.jogador_p}>Jogos Vencidos: <span className={styles.jogos_vencidos}></span></p>
                    <p className={styles.jogador_p}>Gols: <span className={styles.gols_marcados}></span></p>
                    <p className={styles.jogador_p}>Cartão Amarelo: <span className={styles.cartoes_amarelos}></span></p>
                    <p className={styles.jogador_p}>Cartão Vermelho: <span className={styles.cartoes_vermelhos}></span></p>

                    <button className={styles.close_dialog}>OK</button>
                </dialog>

                {/* Modal Time */}
                <dialog className={styles.modal_time}>
                    <h2>Detalhes</h2>

                    <p className={styles.jogador_p}>Nome: <span className={styles.jogos_disputados}></span></p>
                    <p className={styles.jogador_p}>Jogadores: <span className={styles.jogos_vencidos}></span></p>

                    <button className={styles.close_dialog}>OK</button>
                </dialog>

                {/* Cards Jogadores */}
                <div className={styles.consulta_section_h2}><h2>-- Jogadores --</h2></div>
                <div className={styles.consulta_section}>

                    <div className={styles.jogador_consulta}>
                        <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do messi" />
                        <p className={styles.jogador_p}> <span className={styles.jogador_name}> Lionel Messi </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_time}> Time: Paris Saint German </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_posicao}> Posição: Atacante </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_idade}> Idade: 37 anos </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_number}> Camisa: 10 </span></p>

                        <button className={styles.button_estatistica} onClick={() => setIsModalOpen(true)}>Estatisticas</button>
                        {isModalOpen && (
                            <Modal
                                title="Modal Title"
                                message="This is the modal message."
                                onClose={handleModalClose}
                            />
                        )}
                    </div>

                    <div className={styles.jogador_consulta}>
                        <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do messi" />
                        <p className={styles.jogador_p}> <span className={styles.jogador_name}> Lionel Messi </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_time}> Time: Paris Saint German </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_posicao}> Posição: Atacante </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_idade}> Idade: 37 anos </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_number}> Camisa: 10 </span></p>

                        <button className={styles.button_estatistica} onClick={() => setIsModalOpen(true)}>Estatisticas</button>
                        {isModalOpen && (
                            <Modal
                                title="Modal Title"
                                message="This is the modal message."
                                onClose={handleModalClose}
                            />
                        )}
                    </div>

                    <div className={styles.jogador_consulta}>
                        <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do ney" />
                        <p className={styles.jogador_p}> <span className={styles.jogador_name}> Lionel Messi </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_time}> Time: Paris Saint German </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_posicao}> Posição: Atacante </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_idade}> Idade: 37 anos </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_number}> Camisa: 10 </span></p>

                        <button className={styles.button_estatistica} onClick={() => setIsModalOpen(true)}>Estatisticas</button>
                        {isModalOpen && (
                            <Modal
                                title="Modal Title"
                                message="This is the modal message."
                                onClose={handleModalClose}
                            />
                        )}
                    </div>

                    <div className={styles.jogador_consulta}>
                        <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do messi" />
                        <p className={styles.jogador_p}> <span className={styles.jogador_name}> Lionel Messi </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_time}> Time: Paris Saint German </span> </p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_posicao}> Posição: Atacante </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_idade}> Idade: 37 anos </span></p>
                        <p className={styles.jogador_p}> <span className={styles.jogador_number}> Camisa: 10 </span></p>

                        <button className={styles.button_estatistica} onClick={() => setIsModalOpen(true)}>Estatisticas</button>
                        {isModalOpen && (
                            <Modal
                                title="Modal Title"
                                message="This is the modal message."
                                onClose={handleModalClose}
                            />
                        )}
                    </div>
                </div>

                {/* Times */}
                <div className={styles.consulta_section_h2}><h2>-- Times --</h2></div>
                <div className={styles.consulta_time_section}>
                    <div className={styles.time_consulta}>
                        <img src={barcelona_icon} alt="Imagem do barcelona" />
                        <button className={styles.button_estatistica}>Detalhes</button>
                    </div>

                    <div className={styles.time_consulta}>
                        <img src={milan_icon} alt="Imagem do barcelona" />
                        <button className={styles.button_estatistica}>Detalhes</button>
                    </div>

                    <div className={styles.time_consulta}>
                        <img src={manchester_icon} alt="Imagem do barcelona" />
                        <button className={styles.button_estatistica}>Detalhes</button>
                    </div>

                    <div className={styles.time_consulta}>
                        <img src={realMadrid_icon} alt="Imagem do barcelona" />
                        <button className={styles.button_estatistica}>Detalhes</button>
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