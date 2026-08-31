import { createInterface, Interface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import type { PokemonResumo } from "../models/Pokemon.js";
import { BoxService } from "../services/BoxService.js";
import { buscarPokemon } from "../services/PokeApiService.js";

export class TerminalController {

    private readonly terminal: Interface;

    public constructor(
        private readonly boxService: BoxService
    ) {
        this.terminal = createInterface({
            input,
            output
        });
    }

    // Inicia o menu da Pokédex.
    public async iniciar(): Promise<void> {

        // Carrega o catálogo salvo.
        await this.boxService.carregar();

        console.log("Bem-vindo à Pokédex TypeScript Lite!");

        let executando: boolean = true;

        while (executando) {

            this.exibirMenu();

            const opcao: string = (
                await this.terminal.question("Escolha uma opção: ")
            ).trim();

            switch (opcao) {

                case "1":
                    await this.buscarEAdicionarPokemon();
                    break;

                case "2":
                    this.boxService.listar();
                    break;

                case "3":
                    await this.removerPokemon();
                    break;

                case "4":
                    await this.executarFluxoDemonstracao();
                    break;

                case "0":
                    executando = false;
                    console.log("Programa encerrado. Até mais!");
                    break;

                default:
                    console.log("[AVISO] Opção inválida. Tente novamente.");
            }
        }

        this.terminal.close();
    }

    // Mostra as opções do menu.
    private exibirMenu(): void {

        console.log("\nMenu:");
        console.log("1 - Buscar Pokémon e adicionar ao catálogo");
        console.log("2 - Listar catálogo");
        console.log("3 - Remover Pokémon por ID");
        console.log("4 - Executar demonstração automática");
        console.log("0 - Sair");
    }

    // Busca um Pokémon e adiciona no catálogo.
    private async buscarEAdicionarPokemon(): Promise<void> {

        const nomeOuId: string = await this.terminal.question(
            "Digite o nome ou ID do Pokémon: "
        );

        // Busca o Pokémon na PokeAPI.
        const pokemon: PokemonResumo | null =
            await buscarPokemon(nomeOuId);

        // Se encontrou, adiciona no catálogo.
        if (pokemon !== null) {
            await this.boxService.adicionar(pokemon);
        }
    }

    // Remove um Pokémon pelo ID.
    private async removerPokemon(): Promise<void> {

        const idDigitado: string = await this.terminal.question(
            "Digite o ID do Pokémon que deseja remover: "
        );

        const id: number = Number(idDigitado);

        // Verifica se o ID é válido.
        if (Number.isNaN(id) || id <= 0) {
            console.log(
                "[ERRO] ID inválido. Digite um número maior que zero."
            );
            return;
        }

        await this.boxService.remover(id);
    }

    // RF13 - Demonstra o fluxo pedido pelo professor.
    private async executarFluxoDemonstracao(): Promise<void> {

        // Busca e adiciona o Pikachu.
        const pikachu: PokemonResumo | null =
            await buscarPokemon("pikachu");

        if (pikachu !== null) {
            await this.boxService.adicionar(pikachu);
        }

        // Busca e adiciona o Charmander.
        const charmander: PokemonResumo | null =
            await buscarPokemon("charmander");

        if (charmander !== null) {
            await this.boxService.adicionar(charmander);
        }

        // Tenta adicionar o Pikachu novamente.
        const pikachuDuplicado: PokemonResumo | null =
            await buscarPokemon("pikachu");

        if (pikachuDuplicado !== null) {
            await this.boxService.adicionar(pikachuDuplicado);
        }

        // Testa um Pokémon que não existe.
        await buscarPokemon("pokemon-inexistente");

        // Mostra o catálogo.
        this.boxService.listar();

        // Remove o Pokémon de ID 25.
        await this.boxService.remover(25);

        // Mostra o catálogo novamente.
        this.boxService.listar();
    }
}
