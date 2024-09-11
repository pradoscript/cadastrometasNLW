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

     if(respostas.length == 0){
        console.log("Nenhumma meta selecionada!")
        return listarMetas()
     }

     metas.forEach(function (todasAsMetas){
        todasAsMetas.checked = false
     })

     respostas.forEach(function (resposta){
        const meta = metas.find(function (metaRequisitada){
            return metaRequisitada.value == resposta
        })

        meta.checked = true
     })

     console.log("Meta(s) marcada(s) como concluída(s)!")

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
            case "sair":
                console.log("saindo!")
                return
        }
    }
}
start() 