interface categorysInterface{
    name: string
    emoji: string
    hidden?: boolean | false
    translation?: string
}

var categorys: Array<categorysInterface> = [{
    name: "utility",
    emoji: "🤡",
    translation: "Utilidade"
    },
{
    name: "fun",
    emoji: "🥳",
    translation: "Diversão"
},
{
    name: null,
    emoji: "🤔",
    translation: "Sem categoria"
}]

export default categorys