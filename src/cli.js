import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";

const caminho = process.argv;

function imprimeLista(resultado, identificador = '') {
    console.log(
        chalk.yellow('lista de links: '),
        chalk.black.bgGreen(identificador),
        resultado);
}

//função processaTexto deve ser assíncrona pq ela chama a função pegaArquivo, que é assíncrona
async function processaTexto(argumentos) {
    const caminho = argumentos[2];

    //verificando se o caminho informado existe
    try {
        fs.lstatSync(caminho);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
            return;
        }
    }

    //verificando se o argumento é um caminho de um arquivo ou um diretório
    //se for um diretório, passa por todos os arquivos dentro dele
    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(lista, nomeDeArquivo);
        })
    }
}

processaTexto(caminho);
//para funcionar, tem q rodar no terminal: node src/cli.js ./arquivos/texto.md
