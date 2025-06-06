import { useEffect, useState } from 'react';
import './favoritos.css'
import { toast } from 'react-toastify';
import {FavoritoCard, TituloFilme, DetalheLink, BotaoExcluir } from './favoritosStyles'
 



function Favoritos() {


    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);


    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Filme excluído com sucesso!")
    }


    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}

            <ul>
                {filmes.map((item) => {
                    return (
                        <FavoritoCard key={item.id}>
                            <TituloFilme>{item.title}</TituloFilme>
                            <img className="img-details" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
                            <div className="details">
                                <DetalheLink to={`/filme/${item.id}`}>Detalhes</DetalheLink>
                                <BotaoExcluir onClick={() => excluirFilme(item.id)}>Excluir</BotaoExcluir>
                            </div>
                        </FavoritoCard>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;