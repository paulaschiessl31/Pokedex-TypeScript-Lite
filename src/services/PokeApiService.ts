//RF04 - Buscar Pokémon na PokeAPI - Função assincrona faz uma busca na PokeAPI. 
//Recebe o nome ou ID e retorna um PokemonResumo ou null
import type {PokemonApiResponse, PokemonResumo} from "../models/PokemonResumo.js";

export async function buscarPokemon(
    nomeOuId: string
): Promise<PokemonResumo | null>{


    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;

        // fetch faz a requisição para a API e await espera a resposta.
        const resposta = await fetch(url);
        
        // Verifica se a API retornou uma resposta válida.
        if (!resposta.ok){//Verifica se a resposta da API deu certo
            console.log(`[ERRO] Pokémon não encontrado: ${nomeOuId}`);
            return null;//RF05 -Se o Pokémon não existir, retorna um null.
        }

        const dados = await resposta.json() as PokemonApiResponse;//Converte a resposta em JSON.

        //RF06- Mapeamento da resposta da API
        // map transforma os tipos da API em uma lista de nomes.

        const pokemon: PokemonResumo = {
            id: dados.id,
            nome: dados.name,
            tipos: dados.types.map((item) => item.type.name),
            altura: dados.height,
            peso: dados.weight
        };

        console.log (`[OK] Pokémon encontrado: ${pokemon.nome}`);
        return pokemon;

    }catch (erro){
        console.log("[ERRO] Não foi possível buscar o Pokémon.");   
             return null;
    }
}