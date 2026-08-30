/*RF02- PokemonResumo- Essa interface define o molde que o objeto deve ser.
Define quais as informações que o Pokémon vai ter e qual o tipo de cada informação.*/
export interface PokemonResumo { 
    id: number; 
    nome: string; 
    tipos: string[]; 
    altura: number; 
    peso: number; 
}

/*RF03- PokemonResponse- Essa interface representa os dados da PokeAPI que vamos receber.
Não precisamos colocar tudo que a API retorna, só o que vamos usar.*/
export interface PokemonApiResponse { 
    id: number;  
    name: string; 
    height: number; 
    weight: number; 
    types:{ //Informação importante: A API manda os tipos dentro de objetos
        type:{ 
            name: string; //Esse "name" é o nome do tipo, por exemplo: se for o Pikachu vai ser "electric"
        }; 
    }[]; 
}