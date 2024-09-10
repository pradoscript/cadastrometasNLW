//hello world
console.log("Hello World!")

//variável - let
let mensagens = "Fala, NLW POCKET!"
console.log(mensagens)
//variável const
const mensagem = "Trilha JS 1"
{
    const mensagem = "Teste de Escopo!"
    console.log(mensagem)
}
console.log(mensagem)

// arrays
let metas = ['Fala', 'Dev!']
let metas01 = [3, 'Diego']
// concatenando valores
console.log(metas[1] + ", " + metas[0]) 

let metas02 = [
    metas,
    {
        value: 'Terminar a primeira trilha do NLW POCKET!',
        checked: false
    }
]
console.log(metas02[1].value);

// objetos
let meta = {
    value: 'Finalizar o evento da Rocketseat!',
    address: 2,
    checked: true,
    isChecked: () => {
        console.log(info)
    }
}
console.log(meta.value);