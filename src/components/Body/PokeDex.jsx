import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import './pokedex.css';

function PokeDex() {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        handleGetPokemon();
    }, []);

    const handleGetPokemon = () => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=100000")
            .then((res) => {
                const pokemonData = res.data.results.map(pokemon => {
                    return axios.get(pokemon.url);
                });
                return Promise.all(pokemonData);
            })
            .then((responses) => {
                const detailedPokemons = responses.map(response => ({
                    name: response.data.name,
                    image: response.data.sprites.front_default
                }));
                setPokemons(detailedPokemons);
            })
            .catch((error) => console.log(error));
    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleSearch = () => {
        const results = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        setFilteredPokemons(results);
    };

    return (
        <div>
            <Container className="Container">
                <Row>
                    <Col>
                        <div className="PokeDex">
                            <div className="Pokedex-header">
                                <span className="Pokedex-bg-btn"></span>
                                <span className="Pokedex-md-btn"></span>
                                <span className="Pokedex-md-btn"></span>
                            </div>
                            <div className="Pokedex-body">
                                <div className="Pokedex-output">
                                    <span>
                                        {filteredPokemons.map((pokemon, index) => (
                                            <div key={index} className="pokemon-card">
                                                <img src={pokemon.image} alt={pokemon.name} />
                                                <h3>{pokemon.name}</h3>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                                <div className="Pokedex-input">
                                    <input 
                                        type="text" 
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        placeholder="Digite o nome do Pokémon"
                                    />
                                    <button className="pokedex-btn" onClick={handleSearch}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PokeDex;