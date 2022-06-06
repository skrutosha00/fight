import { animateOnce, changeBalance, randInt, setBalanceField } from "./functions.js"

setBalanceField()

let body = document.querySelector('.wrapper')
let healthCont = document.querySelector('.lifes')
let enemyHealthCont = document.querySelector('.enemy_health')
let hero = document.querySelector('.hero')
let enemy = document.querySelector('.enemy')
let balance = document.querySelector('.balance')
let betAmount = document.querySelector('.bet_amount')
let playButton = document.querySelector('.play')

let active = true
let health = 6
let shield = 5
let level = randInt(1, 3)
let enemyHealth = randInt(level + 5, level + 12)

updateHealth()
updateShield()
updateFlasks()

hero.src = '../png/' + localStorage.getItem('chosen_fight') + '.png'
enemy.src = '../png/enemy_' + level + '.png'

document.querySelector('.plus').onclick = () => {
    if (Number(betAmount.innerHTML) + 10 > Number(balance.innerHTML) || !active) { return }

    betAmount.innerHTML = Number(betAmount.innerHTML) + 10
}

document.querySelector('.minus').onclick = () => {
    if (!active || Number(betAmount.innerHTML) - 10 < 0) { return }

    betAmount.innerHTML = Number(betAmount.innerHTML) - 10
}

playButton.onclick = () => {
    if (!active || Number(betAmount.innerHTML) > Number(balance.innerHTML) || !Number(betAmount.innerHTML)) { return }
    changeBalance(-Number(betAmount.innerHTML))
    active = false

    shield = 5
    health = 6
    enemyHealth = randInt(level + 5, level + 12)
    updateHealth()
    updateShield()

    if (hero.classList.contains('hidden') || enemy.classList.contains('hidden')) {
        for (let pers of [hero, enemy]) {
            pers.classList.remove('hidden')
        }

        setTimeout(() => {
            fight()
        }, 600);
    } else {
        fight()
    }
}

document.querySelector('.auto').onclick = () => {
    if (!active || Number(betAmount.innerHTML) > Number(balance.innerHTML) || !Number(betAmount.innerHTML)) { return }

    let i = 0
    playButton.click()
    let autoInterval = setInterval(() => {
        playButton.click()
        i++

        if (i == 4) {
            clearInterval(autoInterval)
        }
    }, 10000);
}

document.querySelector('.flask[data-color="red"]').onclick = () => {
    if (!Number(localStorage.getItem('flask_red_fight')) || active) { return }

    localStorage.setItem('flask_red_fight', Number(localStorage.getItem('flask_red_fight')) - 1)
    health = (health == 5 || health == 6) ? health = 6 : health += 2
    updateHealth()
    updateFlasks()
}

document.querySelector('.flask[data-color="blue"]').onclick = () => {
    if (!Number(localStorage.getItem('flask_blue_fight')) || active) { return }

    localStorage.setItem('flask_blue_fight', Number(localStorage.getItem('flask_blue_fight')) - 1)
    shield = shield == 5 ? shield = 5 : shield += 2
    updateShield()
    updateFlasks()
}

function fight() {
    if (enemy.offsetWidth < body.offsetWidth * 0.55) {
        enemy.style.right = 'calc(55% - ' + enemy.offsetWidth + 'px)'
    }
    if (hero.offsetWidth < body.offsetWidth * 0.55) {
        hero.style.left = 'calc(55% - ' + hero.offsetWidth + 'px)'
    }

    for (let pers of [hero, enemy]) {
        pers.src = pers.src.replace('.png', '.gif')
    }

    let fightInterval = setInterval(() => {
        enemyHealth -= 1
        updateHealth()
        if (!enemyHealth) {
            clearInterval(fightInterval)
            gameOver(true)
            return
        }

        if (shield) {
            shield -= 1
            updateShield()
        } else if (health) {
            health -= 1
            updateHealth()

            if (!health) {
                clearInterval(fightInterval)
                gameOver(false)
                return
            }
        }

    }, 700);
}

function gameOver(win) {
    if (win) {
        enemy.classList.add('hidden')

        changeBalance(Number(betAmount.innerHTML) * 2)
        animateOnce('.balance')
    } else {
        hero.classList.add('hidden')
    }

    for (let pers of [hero, enemy]) {
        pers.src = pers.src.replace('.gif', '.png')
    }

    setTimeout(() => {
        hero.style.left = enemy.style.right = '3%'
        active = true
    }, 600);
}

function updateHealth() {
    healthCont.innerHTML = ''
    enemyHealthCont.innerHTML = ''

    for (let i = 0; i < Math.ceil(health / 2); i++) {
        let heart = document.createElement('img')
        heart.src = '../png/heart.png'
        healthCont.appendChild(heart)
    }

    for (let i = 0; i < Math.ceil(enemyHealth / 4); i++) {
        let heart = document.createElement('img')
        heart.src = '../png/heart.png'
        enemyHealthCont.appendChild(heart)
    }
}

function updateShield() {
    document.querySelector('.inner_shield_bar').style.width = 20 * shield + '%'
}

function updateFlasks() {
    for (let color of ['red', 'blue']) {
        document.querySelector('.flask_' + color + '_amount').innerHTML = 'x' + localStorage.getItem('flask_' + color + '_fight')
    }
}