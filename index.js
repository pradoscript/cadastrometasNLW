const {select, input} = require("@inquirer/prompts")

let metas = []

async function cadastrarMeta(){

    const meta = await input({
        message: "Digite uma meta:"
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
            ]
        })


        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                console.log("listando!")
                break
            case "sair":
                console.log("saindo!")
                return
        }
    }
}
start() 