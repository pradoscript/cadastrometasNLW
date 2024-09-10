const {select} = require("@inquirer/prompts")

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
                console.log("voce cadastrou!")
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