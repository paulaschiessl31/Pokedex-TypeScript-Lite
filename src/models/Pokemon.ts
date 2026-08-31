// RF02 - PokemonResumo.
// Define o formato do Pokémon que o nosso sistema vai usar e salvar.
export interface PokemonResumo {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;
    hp: number;
    ataque: number;
    defesa: number;
}

// Representa cada tipo que vem dentro do array "types" da PokeAPI.
// A API coloca o nome do tipo dentro de outro objeto.
export interface PokemonApiTypeItem {
    type: {
        name: string;
    };
}

// Representa cada item que vem dentro do array "stats" da PokeAPI.
// "base_stat" guarda o valor do atributo e "stat.name" diz qual é o atributo.
export interface PokemonApiStatItem {
    base_stat: number;
    stat: {
        name: string;
    };
}

// RF03 - PokemonApiResponse.
// Representa os dados que recebemos da PokeAPI.
// Não precisamos pegar tudo que a API manda, só o que vamos usar no projeto.
export interface PokemonApiResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonApiTypeItem[];
    stats: PokemonApiStatItem[];
}

