import { TerminalController } from "./controllers/TerminalController.js";
import { BoxService } from "./services/BoxService.js";

// Função principal que inicia o projeto.
async function main(): Promise<void> {

    // Cria o serviço que cuida do catálogo e do arquivo JSON.
    const boxService = new BoxService();

    // Cria o controller e passa o BoxService para ele.
    const terminalController = new TerminalController(boxService);

    // Inicia o menu da Pokédex.
    await terminalController.iniciar();
}

// Se acontecer algum erro inesperado, mostra no terminal.
main().catch((erro: unknown) => {
    console.log("[ERRO] Falha inesperada ao executar a aplicação.");
    console.error(erro);
});

