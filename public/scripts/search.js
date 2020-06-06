function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) =>{return res.json()} ) //(res =>return res.json())
    .then( states => {
        for ( state of states){

            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`

        }
        
    } )
}

function getCities(){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) =>{return res.json()} ) //(res =>return res.json())
    .then( cities => {

        for ( city of cities){

            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`

        }
        citySelect.disabled = false
        
    } )
}

populateUFs()

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect){
    item.addEventListener("click", hanleSelectedItem)

}

function hanleSelectedItem(event){
    const itemLi = event.target
    //console.log(itenId);

    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    //verificar se já existe o item selecionado
    //se sim pegar o item
    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    //se já tiver selecionado, tirar a selecao
    if(alreadySelected >=0){
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItens = filteredItens
    }
    else {
        //se não estiver selecionado, adicionar

        selectedItens.push(itemId)
    }
    
    
    collectedItens.value = selectedItens    

    
}

