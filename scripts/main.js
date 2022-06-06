import { setBalanceField } from "./functions.js";

if (!localStorage.getItem('balance_fight')) {
    localStorage.setItem('balance_fight', 1000)
}

if (!localStorage.getItem('hero_knife_fight')) {
    localStorage.setItem('hero_knife_fight', 0)
}

if (!localStorage.getItem('hero_bow_fight')) {
    localStorage.setItem('hero_bow_fight', 0)
}

if (!localStorage.getItem('flask_red_fight')) {
    localStorage.setItem('flask_red_fight', 0)
}

if (!localStorage.getItem('flask_blue_fight')) {
    localStorage.setItem('flask_blue_fight', 0)
}

if (!localStorage.getItem('chosen_fight')) {
    localStorage.setItem('chosen_fight', 'hero_sword')
}

setBalanceField()