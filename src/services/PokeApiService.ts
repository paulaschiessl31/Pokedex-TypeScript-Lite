// RF04 - Buscar Pokémon na PokeAPI.
// Busca pelo nome ou ID e retorna um PokemonResumo ou null.

import { APIError } from "../models/CustomErrors.js";
import type {
    PokemonApiResponse,
    PokemonResumo
} from "../models/Pokemon.js";

export async function buscarPokemon(
    nomeOuId: string
): Promise<PokemonResumo | null> {

    try {

        const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;

        // fetch faz a requisição e await espera a resposta.
        const resposta = await fetch(url);

        // Se o Pokémon não existir, gera um erro.
        if (resposta.status === 404) {
            throw new APIError(
                `Pokémon não encontrado: ${nomeOuId}`
            );
        }

        // Verifica se aconteceu algum outro erro na API.
        if (!resposta.ok) {
            throw new APIError(
                `Erro ao consultar a PokeAPI. Status: ${resposta.status}`
            );
        }

        // Converte a resposta para JSON.
        const dados =
            await resposta.json() as PokemonApiResponse;

        // RF06 - Mapeia os dados da API para o nosso formato.
        // map pega só os nomes dos tipos.
        const tipos: string[] = dados.types.map(
            (item) => item.type.name
        );

        // find procura os stats que precisamos.
        const statHp = dados.stats.find(
            (item) => item.stat.name === "hp"
        );

        const statAtaque = dados.stats.find(
            (item) => item.stat.name === "attack"
        );

        const statDefesa = dados.stats.find(
            (item) => item.stat.name === "defense"
        );

        // Monta o Pokémon com os dados que vamos usar.
        const pokemon: PokemonResumo = {
            id: dados.id,
            nome: dados.name,
            tipos,
            altura: dados.height,
            peso: dados.weight,
            hp: statHp?.base_stat ?? 0,
            ataque: statAtaque?.base_stat ?? 0,
            defesa: statDefesa?.base_stat ?? 0
        };

        console.log(
            `[OK] Pokémon encontrado: ${pokemon.nome}`
        );

        return pokemon;

    } catch (erro: unknown) {

        // Se for um erro que criamos, mostra a mensagem dele.
        if (erro instanceof APIError) {
            console.log(`[ERRO] ${erro.message}`);
            return null;
        }

        // Se acontecer outro problema na requisição, cai aqui.
        console.log(
            "[ERRO] Não foi possível buscar o Pokémon."
        );

        return null;
    }
}
