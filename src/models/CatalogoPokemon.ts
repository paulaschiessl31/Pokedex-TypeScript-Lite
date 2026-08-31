import type { PokemonResumo } from "../models/PokemonResumo.js";

export class CatalogoPokemon {

    // RF07 - Catálogo local em memória.
    // Array que armazena os Pokémon durante a execução.
    private pokemons: PokemonResumo[] = [];

    // RF08 - Adicionar Pokémon ao catálogo.
    adicionar(pokemon: PokemonResumo): void { 
        // RF11 - Métodos de array- some() verifica se o Pokémon já existe pelo ID.
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
        // RF11 - forEach() percorre o array e mostra cada Pokémon.
        this.pokemons.forEach((pokemon) => {
            console.log(
                `#${pokemon.id} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(",")}`
            ); 
        }); 
    }

    // RF10 - Remover Pokémon do catálogo pelo ID.
    // RF11 - Verifica se o Pokémon existe e remove usando filter().
    remover(id: number): void {
        const existe = this.pokemons.some(
            (pokemon) => pokemon.id === id
        );

        if (!existe) {
            console.log("[AVISO] Nenhum Pokémon encontrado com esse ID.");
            return;
        }
        
        this.pokemons = this.pokemons.filter(
            (pokemon) => pokemon.id !== id
        );

        console.log("[OK] Pokémon removido do catálogo.");
    }
}