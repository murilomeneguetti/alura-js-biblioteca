import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = '') {

    if (valida) {
        console.log(
            chalk.yellow('lista validada: '),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('lista de links: '),
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

//função processaTexto deve ser assíncrona pq ela chama a função pegaArquivo, que é assíncrona
async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

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
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}

processaTexto(caminho);
//para funcionar, tem q rodar no terminal: node src/cli.js ./arquivos/texto.md

//[gatinho salsicha](http://gatinhosalsicha.com.br/)