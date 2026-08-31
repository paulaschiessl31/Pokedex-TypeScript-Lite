import { readFile, writeFile } from "node:fs/promises";
import type { PokemonResumo } from "../models/Pokemon.js";
import { LocalBoxError } from "../models/CustomErrors.js";
import { formatarLinhaPokemon } from "../utils/textFormatters.js";

// Caminho do arquivo onde vamos guardar os Pokémon.
const CAMINHO_ARQUIVO = new URL("../../pc_box.json", import.meta.url);

export class BoxService {

    // RF07 - Catálogo local.
    // Array que guarda os Pokémon durante a execução.
    private pokemons: PokemonResumo[] = [];

    // Lê o que já está salvo no pc_box.json.
    async carregar(): Promise<void> {

        try {

            const conteudo = await readFile(
                CAMINHO_ARQUIVO,
                "utf-8"
            );

            // Transforma o JSON em um array de Pokémon.
            const dados: unknown = JSON.parse(conteudo);

            // Verifica se o JSON realmente é um array.
            if (!Array.isArray(dados)) {
                throw new LocalBoxError(
                    "O arquivo pc_box.json não contém um array válido."
                );
            }

            this.pokemons = dados as PokemonResumo[];

        } catch (erro) {

            // Se for um erro nosso, mostra a mensagem.
            if (erro instanceof LocalBoxError) {
                console.log(`[ERRO] ${erro.message}`);
            }

            // Se o arquivo ainda não existir ou estiver com problema,
            // começa com o catálogo vazio.
            this.pokemons = [];

            // Cria/salva o arquivo com o catálogo vazio.
            await this.salvar();
        }
    }

    // Salva o catálogo no pc_box.json.
    private async salvar(): Promise<void> {

        try {

            const dados = JSON.stringify(
                this.pokemons,
                null,
                2
            );

            await writeFile(
                CAMINHO_ARQUIVO,
                `${dados}\n`,
                "utf-8"
            );

        } catch (erro) {

            throw new LocalBoxError(
                "Não foi possível salvar o catálogo."
            );
        }
    }

    // RF08 - Adicionar Pokémon ao catálogo.
    async adicionar(
        pokemon: PokemonResumo
    ): Promise<void> {

        // RF11 - some() verifica se já existe pelo ID.
        const jaExiste = this.pokemons.some(
            (item) => item.id === pokemon.id
        );

        if (jaExiste) {
            console.log(
                `[AVISO] ${pokemon.nome} já está no catálogo.`
            );
            return;
        }

        // Coloca o Pokémon no array.
        this.pokemons.push(pokemon);

        // Salva o catálogo atualizado.
        await this.salvar();

        console.log(
            `[OK] ${pokemon.nome} adicionado ao catálogo.`
        );
    }

    // RF09 - Listar Pokémon do catálogo.
    listar(): void {

        if (this.pokemons.length === 0) {
            console.log("[AVISO] Catálogo vazio.");
            return;
        }

        // RF11 - forEach() passa por cada Pokémon.
        this.pokemons.forEach((pokemon) => {
            console.log(
                formatarLinhaPokemon(pokemon)
            );
        });
    }

    // RF10 - Remover Pokémon pelo ID.
    async remover(id: number): Promise<void> {

        // RF11 - some() verifica se existe pelo ID.
        const existe = this.pokemons.some(
            (pokemon) => pokemon.id === id
        );

        if (!existe) {
            console.log(
                "[AVISO] Nenhum Pokémon encontrado com esse ID."
            );
            return;
        }

        // RF11 - filter() tira o Pokémon do array.
        this.pokemons = this.pokemons.filter(
            (pokemon) => pokemon.id !== id
        );

        // Salva depois da remoção.
        await this.salvar();

        console.log(
            "[OK] Pokémon removido do catálogo."
        );
    }

    // Devolve uma cópia do catálogo.
    obterTodos(): PokemonResumo[] {
        return [...this.pokemons];
    }
}

