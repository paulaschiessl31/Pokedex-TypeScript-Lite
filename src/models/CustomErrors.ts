// Erro usado quando acontece algum problema na PokeAPI.
export class APIError extends Error {

    constructor(message: string) {

        super(message);

        this.name = "APIError";
    }
}

// Erro usado quando acontece algum problema com o arquivo local.
export class LocalBoxError extends Error {

    constructor(message: string) {

        super(message);

        this.name = "LocalBoxError";
    }
}
