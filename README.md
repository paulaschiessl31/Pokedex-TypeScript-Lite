# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação em Node.js com TypeScript que consulta dados de Pokémon na [PokeAPI](https://pokeapi.co/) e organiza os Pokémon encontrados em um catálogo local salvo em arquivo JSON.

## Objetivo

Praticar conceitos de desenvolvimento Back-End utilizando:

* Node.js
* TypeScript
* Interfaces
* Classes
* Objetos
* Arrays
* JSON
* Métodos de array
* `async/await`
* `fetch`
* Tratamento de erros
* Git e GitHub
* GitFlow
* Kanban

## Tecnologias utilizadas

* Node.js
* TypeScript
* TSX
* PokeAPI
* Git
* GitHub

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm
* Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/paulaschiessl31/Pokedex-TypeScript-Lite
```

Acesse a pasta do projeto:

```bash
cd Pokedex-TypeScript-Lite
```

Instale as dependências:

```bash
npm install
```

## Como executar

Execute o projeto com:

```bash
npm run start
```

Após iniciar, o programa apresenta um menu no terminal:

```text
Menu:
1 - Buscar Pokémon e adicionar ao catálogo
2 - Listar catálogo
3 - Remover Pokémon por ID
4 - Executar demonstração automática
0 - Sair
```

## Estrutura do projeto

```text
Pokedex-TypeScript-Lite/
│
├── src/
│   ├── main.ts
│   │
│   ├── controllers/
│   │   └── TerminalController.ts
│   │
│   ├── services/
│   │   ├── PokeApiService.ts
│   │   └── BoxService.ts
│   │
│   ├── models/
│   │   ├── Pokemon.ts
│   │   └── CustomErrors.ts
│   │
│   └── utils/
│       └── textFormatters.ts
│
├── pc_box.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Funcionalidades

* Buscar Pokémon por nome ou ID
* Consultar a PokeAPI utilizando `fetch`
* Tratar erro de Pokémon inexistente
* Transformar os dados da API em um objeto simplificado
* Adicionar Pokémon ao catálogo
* Impedir Pokémon duplicado
* Listar Pokémon cadastrados
* Remover Pokémon pelo ID
* Salvar o catálogo em arquivo JSON
* Carregar o catálogo salvo ao iniciar o programa
* Exibir HP, ataque e defesa
* Executar uma demonstração automática do fluxo

## Exemplos de execução

### Busca válida

Entrada:

```text
Digite o nome ou ID do Pokémon: pikachu
```

Saída:

```text
[OK] Pokémon encontrado: pikachu
[OK] pikachu adicionado ao catálogo.
```

Ao listar:

```text
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
```

### Busca inválida

Entrada:

```text
Digite o nome ou ID do Pokémon: pokemon-inexistente
```

Saída:

```text
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Pokémon duplicado

Ao tentar adicionar o mesmo Pokémon novamente:

```text
[AVISO] pikachu já está no catálogo.
```

### Remoção

Entrada:

```text
Digite o ID do Pokémon que deseja remover: 25
```

Saída:

```text
[OK] Pokémon removido do catálogo.
```

## Conceitos aplicados

### TypeScript

O projeto utiliza tipagem explícita em interfaces, parâmetros, variáveis e retornos de funções.

### Interface `PokemonResumo`

A interface `PokemonResumo` define o formato dos dados que o sistema utiliza para representar um Pokémon:

* ID
* Nome
* Tipos
* Altura
* Peso
* HP
* Ataque
* Defesa

### Interface `PokemonApiResponse`

A interface `PokemonApiResponse` representa os dados recebidos da PokeAPI que são necessários para o funcionamento do projeto.

### Fetch e async/await

A aplicação utiliza `fetch` para consultar a PokeAPI e `async/await` para trabalhar com as requisições de forma assíncrona.

### Tratamento de erros

O projeto utiliza `try/catch` para tratar erros durante a consulta à API e durante a leitura e gravação do catálogo local.

Também foram criadas as classes `APIError` e `LocalBoxError` para representar erros específicos do sistema.

### Métodos de array

Foram utilizados diferentes métodos de array no projeto:

* `map()` para obter os nomes dos tipos do Pokémon.
* `find()` para encontrar HP, ataque e defesa.
* `some()` para verificar se um Pokémon já existe no catálogo.
* `filter()` para remover um Pokémon.
* `forEach()` para percorrer e exibir o catálogo.
* `join()` para organizar os tipos na exibição.

### BoxService

A classe `BoxService` é responsável pelo catálogo local.

Ela possui métodos para:

* carregar o catálogo;
* salvar o catálogo;
* adicionar Pokémon;
* listar Pokémon;
* remover Pokémon;
* obter todos os Pokémon.

O catálogo é persistido no arquivo `pc_box.json`.

### TerminalController

A classe `TerminalController` é responsável pela interação com o usuário através do terminal.

Ela apresenta o menu e coordena as ações de busca, adição, listagem, remoção e demonstração do fluxo.

## Organização do Kanban

Link do Kanban:

```text
https://github.com/users/paulaschiessl31/projects/2
```

## Branches utilizadas

* `main`
* `develop`
* `feat/catalogo`
* `feat/pokedex`
* `feature/pokedex-terminal`

## Melhorias futuras

Algumas possibilidades de evolução do projeto:

* Criar filtros por tipo de Pokémon
* Permitir busca de vários Pokémon de uma vez
* Melhorar a apresentação dos dados no terminal
* Criar uma API própria utilizando Express
* Adicionar novos recursos ao catálogo
