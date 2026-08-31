import type { PokemonResumo } from "../models/Pokemon.js";

// Formata os dados do Pokémon para mostrar no terminal.
export function formatarLinhaPokemon(pokemon: PokemonResumo): string {

    const tipos = pokemon.tipos.join(", ");

    return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso} | HP: ${pokemon.hp} | Ataque: ${pokemon.ataque} | Defesa: ${pokemon.defesa}`;
}

// Deixa a primeira letra do texto maiúscula.
export function primeiraMaiuscula(texto: string): string {

    if (texto.length === 0) {
        return texto;
    }

    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

