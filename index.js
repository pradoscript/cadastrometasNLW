const {select, input, checkbox } = require("@inquirer/prompts")
const fs = require("fs").promises
let mensagem = "Bem-Vindo ao App de Gerenciamento de Metas"
let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

async function cadastrarMeta(){

    const meta = await input({
        message: "Digite uma meta:",
        instructions: false
    })
    if(meta.length == 0){
        console.log("A meta não pode ser vazia!")
        return cadastrarMeta()
    }
    metas.push({
        value: meta,
        checked: false
    })

    mensagem = "Meta Cadastrada com Sucesso!"
}

async function listarMetas(){
    if(metas.length == 0){
        mensagem = "Não existem metas cadastradas!"
        return
    }
     const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
     })

     metas.forEach(function (todasAsMetas){
        todasAsMetas.checked = false
     })

     if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!"
        return 
     }

     respostas.forEach(function (resposta){
        const meta = metas.find(function (metaRequisitada){
            return metaRequisitada.value == resposta
        })

        meta.checked = true
     })

     mensagem = "Meta(s) marcada(s) como concluída(s)!"

}

const metasRealizadas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas cadastradas!"
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked 
    })

    if(realizadas.length == 0){
        mensagem = "Não existe nenhuma meta realizada!"
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })

    console.log(realizadas)
}

const metasAbertas = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas cadastradas!"
        return
    }
    const naoRealizadas = metas.filter((meta) => {
        return meta.checked == false
    })

    if(naoRealizadas.length == 0){
        mensagem = "Todas as metas foram realizadas!"
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...naoRealizadas]
    })

    console.log(naoRealizadas)
}

const excluirMeta = async () => {
    if(metas.length == 0){
        mensagem = "Não existem metas cadastradas!"
        return
    }
    const desmarcarTodasMetas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itemsADeletar = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para EXCLUIR essa META",
        choices: [...desmarcarTodasMetas],
        instructions: false
     })

     if (itemsADeletar.length == 0){
        mensagem  = "Nenhuma meta foi selecionada!"
        return
     }

     itemsADeletar.forEach((item) => {
        metas = metas.filter((itemArrayOriginal) => {
            return itemArrayOriginal.value != item
        })
     })
    mensagem = "Meta(s) Excluída(s) com Sucesso!"
}

const mostrarMensagens = () => {
    console.clear()
    if (mensagem != ""){
        console.log(mensagem + "\n")
        mensagem = ""
    }
}

async function start() {
    await carregarMetas()
    while (true) { //CTRL + C PARA STOPAR O LOOP NO CONSOLE
        mostrarMensagens()
        salvarMetas()
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar Meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Excluir Metas",
                    value: "excluir"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ],
            instructions: false
        })


        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "excluir":
                await excluirMeta()
                break
            case "sair":
                console.log("Saindo!")
                return
        }
    }
}
start() 