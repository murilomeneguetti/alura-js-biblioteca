//fs (file system) é uma biblioteca nativa do js
import fs from 'fs';
import chalk from 'chalk';


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}));

    return resultados;
}

function trataErro(erro) {
    console.log(erro);
    //throw: lança uma mensagem de erro no terminal
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        console.log(extraiLinks(texto));
    } catch (erro) {
        trataErro(erro);
    }
}

//promises com then()
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     //primises: forma que o js trabalha com codigo assincrono
//     //then é a ação que eu quero fazer depois que receber o retorno da função assíncrona, no caso o texto da função readFile
//     //caso aconteça algum erro no then, ele é lançado dentro do catch
//     fs.promises.readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch((erro) => trataErro(erro))
// }

//versão síncrona, sem promises
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

pegaArquivo('./arquivos/texto.md');
