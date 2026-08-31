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
}