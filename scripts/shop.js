import { setBalanceField, changeBalance, animateOnce } from "./functions.js";

setBalanceField()

let items = [
    { name: "hero_knife", price: 1200, flask: false },
    { name: "hero_bow", price: 900, flask: false },
    { name: "flask_blue", price: 300, flask: true },
    { name: "flask_red", price: 300, flask: true }
]

let balance = document.querySelector('.balance')
let cardCont = document.querySelector('.shop')

for (let item of items) {
    let card = document.createElement('div')
    card.classList.add('card')

    let pic = document.createElement('img')
    pic.src = '../png/' + item.name + '.png'
    card.appendChild(pic)

    let price = document.createElement('div')
    price.classList.add('price')
    price.innerHTML = item.price
    card.appendChild(price)

    let button = document.createElement('div')
    button.classList.add('button', 'block')
    button.innerHTML = 'BUY'
    button.dataset.item = item.name

    if (localStorage.getItem(item.name + '_fight') == 1 && !item.flask) {
        button.innerHTML = 'SELECT'
    }

    card.appendChild(button)

    button.onclick = () => {
        let price = Number(button.parentElement.querySelector('.price').innerHTML)

        if (localStorage.getItem(button.dataset.item + '_fight') == 1 && !item.flask) {
            localStorage.setItem('chosen_fight', button.dataset.item)
        }

        if (!(button.innerHTML == 'SELECT')) {
            if (Number(balance.innerHTML) <= price) {
                animateOnce('.balance')
                return
            }

            changeBalance(-price)

            if (!item.flask) {
                button.innerHTML = 'SELECT'
                localStorage.setItem('chosen_fight', button.dataset.item)
            }

            localStorage.setItem(button.dataset.item + '_fight', Number(localStorage.getItem(button.dataset.item + '_fight')) + 1)
        }
    }

    cardCont.appendChild(card)
}