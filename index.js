function start() {
    while (true) { //CTRL + C PARA STOPAR O LOOP NO CONSOLE
        let opcao = "sair"
        switch (opcao) {
            case "entrar":
                console.log("voce entrou!")
                break
            case "sair":
                console.log("voce saiu!")
                break
        }
    }
}
start()