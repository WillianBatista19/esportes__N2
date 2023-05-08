import styles from './homecss.module.css'
import barcelona_icon from '../../images/barcelona icon.png'
import manchester_icon from '../../images/manchester logo.png'
import milan_icon from '../../images/milan logo.png'
import realMadrid_icon from '../../images/real madrid logo.png'

import React, { useState } from 'react';
import Modal from '../modal';
import SearchBar from '../SearchBar'

function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalClose() {
    setIsModalOpen(false);
    }

    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(searchTerm) {
        fetch(`https://api.example.com/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => setSearchResults(data.results))
        .catch(error => console.error(error));}

    return (
        <>
            <main>
                <div className={styles.intro_container}>
                    {/* Chuteira */}
                    <div className={styles.pesquisa_container}>
                    
                        <SearchBar onSearch={handleSearch} />
                        <ul>
                            {searchResults.map(result => (
                            <li key={result.id}>{result.title}</li>
                            ))}
                        </ul>                        
                    </div>
                </div>
                {/* modal */}
                <dialog className={styles.modal}>
                    <h2>Estatisticas</h2>

                        <p className={styles.jogador_p}>Jogos disputados: <span className={styles.jogos_disputados}></span> </p>
                        <p className={styles.jogador_p}>Jogos Vencidos: <span className={styles.jogos_vencidos}></span></p>
                        <p className={styles.jogador_p}>Gols: <span className={styles.gols_marcados}></span></p>
                        <p className={styles.jogador_p}>Cartão Amarelo: <span className={styles.cartoes_amarelos}></span></p>
                        <p className={styles.jogador_p}>Cartão Vermelho: <span className={styles.cartoes_vermelhos}></span></p>

                        <button className={styles.close_dialog} onclick="document.getElementById('modal').style.display='none'">OK</button>
                </dialog>

                {/* Modal Time */}
                <dialog className={styles.modal_time}>
                    <h2>Detalhes</h2>

                        <p className={styles.jogador_p}>Nome: <span className={styles.jogos_disputados}></span></p>
                        <p class={styles.jogador_p}>Jogadores: <span className={styles.jogos_vencidos}></span></p>

                        <button className={styles.close_dialog} onclick="document.getElementById('modal_time').style.display='none'">OK</button>
                </dialog>

                {/* Cards Jogadores */}
                    <div className={styles.consulta_section_h2}><h2>-- Jogadores --</h2></div>
                    <div className={styles.consulta_section }>

                        <div className={styles.jogador_consulta}>
                            <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do messi"/>
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
                            <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do messi"/>
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
                            <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do ney"/>
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
                            <img src="https://apiv3.apifootball.com/badges/players/327_neymar.jpg" alt="Imagem do messi"/>
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
                            <img src={barcelona_icon} alt="Imagem do barcelona"/>
                            <button className={styles.button_estatistica} onclick="document.getElementById('modal_time').style.display='block'">Detalhes</button>
                        </div>

                        <div className={styles.time_consulta}>
                            <img src={milan_icon} alt="Imagem do barcelona"/>
                            <button className={styles.button_estatistica} onclick="document.getElementById('modal_time').style.display='block'">Detalhes</button>
                        </div>

                        <div className={styles.time_consulta}>
                            <img src={manchester_icon} alt="Imagem do barcelona"/>
                            <button className={styles.button_estatistica} onclick="document.getElementById('modal_time').style.display='block'">Detalhes</button>
                        </div>

                        <div className={styles.time_consulta}>
                            <img src={realMadrid_icon} alt="Imagem do barcelona"/>
                            <button className={styles.button_estatistica} onclick="document.getElementById('modal_time').style.display='block'">Detalhes</button>
                        </div>
                    </div>
            </main>
            
            <footer class={styles.footer_container}>
                <div className={styles.footer_bar}>
                <p>Copyright ® 2023 David, Vicente e Willian. Projeto educacional WEB1</p>
                </div>
            </footer>
        </>
    )
}

export default Home;