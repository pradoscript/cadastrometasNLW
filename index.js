const {select, input, checkbox } = require("@inquirer/prompts")

let metas = []

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
}

async function listarMetas(){
     const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
     })

     metas.forEach(function (todasAsMetas){
        todasAsMetas.checked = false
     })

     if(respostas.length == 0){
        console.log("Nenhumma meta selecionada!")
        return 
     }

     respostas.forEach(function (resposta){
        const meta = metas.find(function (metaRequisitada){
            return metaRequisitada.value == resposta
        })

        meta.checked = true
     })

     console.log("Meta(s) marcada(s) como concluída(s)!")

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked 
    })

    if(realizadas.length == 0){
        console.log("Não existe nenhuma meta realizada!")
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })

    console.log(realizadas)
}

const metasAbertas = async () => {
    const naoRealizadas = metas.filter((meta) => {
        return meta.checked == false
    })

    if(naoRealizadas.length == 0){
        console.log("Todas as metas foram realizadas!")
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...naoRealizadas]
    })

    console.log(naoRealizadas)
}

const excluirMeta = async () => {
    const desmarcarTodasMetas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itemsADeletar = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para EXCLUIR essa META",
        choices: [...desmarcarTodasMetas],
        instructions: false
     })

     if (itemsADeletar.length == 0){
        console.log("Nenhuma meta foi selecionada!")
        return
     }

     itemsADeletar.forEach((item) => {
        metas = metas.filter((itemArrayOriginal) => {
            return itemArrayOriginal.value != item
        })
     })
    console.log("Meta(s) Excluída(s) com Sucesso!")
}

async function start() {
    while (true) { //CTRL + C PARA STOPAR O LOOP NO CONSOLE
        
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
                console.log(metas)
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
                console.log("saindo!")
                return
        }
    }
}
start() 