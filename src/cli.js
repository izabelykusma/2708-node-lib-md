import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js'; 

const caminho = process.argv;

function imprimeListas(resultado, identificador = '') {
    
    if (valida) {
        console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        listaValidada (resultado));
} else {
     console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
}

}     

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3];
   
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe')
        }
    }

if (fs.lstaSync(caminho).isFile()) {
    const resultado = await pegaArquivo(argumentos[2]);
    imprimeListas(resultado);
} else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivo = await fs.promises.readdir(caminho)
    arquivo.forEach(async (nomeDeArquivo) => {
        const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
        imprimeListas(lista, nomeDeArquivo)
     })
}
}

processaTexto(caminho);