import type { PokemonResumo } from "../models/PokemonResumo.js";

export class CatalogoPokemon {

    // RF07 - Catálogo local em memória.
    // Array que armazena os Pokémon durante a execução.
    private pokemons: PokemonResumo[] = [];

    // RF08 - Adicionar Pokémon ao catálogo.
    // Verifica se o Pokémon já existe pelo ID antes de adicionar.
    adicionar(pokemon: PokemonResumo): void { 
        const jaExiste = this.pokemons.some((item) => item.id === pokemon.id); 

        if (jaExiste) {
            console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`); 
            return; 
        } 

        this.pokemons.push(pokemon);
        console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`); 
    } 

    // RF09 - Listar Pokémon do catálogo.
    // Verifica se está vazio e usa forEach para mostrar os dados.
    listar(): void { 
        if (this.pokemons.length === 0) {
            console.log("[AVISO] Catálogo vazio."); 
            return; 
        } 

        this.pokemons.forEach((pokemon) => {
            console.log(
                `#${pokemon.id} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(",")} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`
            ); 
        }); 
    }  
}