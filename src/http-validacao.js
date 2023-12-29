import chalk from "chalk";

function extraiLinks (arrLinks) {
    //Object.values extrai o valor de um objeto e joga para dentro de um array
    //.join() pega o conteudo de um array e converte em uma string
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

//validar os links com fetch
async function checaStatus (listaURLs) {
    //Promise.all recebe uma lista de promessas, resolve todas as promessas e retorna uma lista das promessas resolvidas
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch (error) {
                return manejaErros(error);
            }
        })
    )
    return arrStatus;
}

function manejaErros (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

export default async function listaValidada (listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    //console.log(status);
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
}
