import { initialCards } from '../init/cards.js';
import rendererCard from './renderer.js';

const inputSearch = document.querySelector(".input-search")
const buttonSearch = document.querySelector("#button-search")
const buttonRemoveSearch = document.querySelector(".button-remove-search")
const buttonMainSmart1 = document.querySelector(".main-smart-button1")
const buttonMainSmart2 = document.querySelector(".main-smart-button2")
let card = []

buttonMainSmart1.addEventListener("click", () => {
  const card = initialCards.filter((item) => { if (item.status === "В наличии") { return true } })
  card = filt
  rendererCard(card)
})

buttonMainSmart2.addEventListener("click", () => {
  const filt = initialCards.filter(item => { if (item.status === "Под заказ") { return true } })
  card = filt
  rendererCard(card)
})

function search(items, search) {
  const filt = items.filter(el => {
    return (el.name + " " + el.about + " " + el.description + " " + el.status).toLowerCase().trim().
      includes(search.value.toLowerCase().trim());
  })
  card = filt
}

buttonRemoveSearch.addEventListener("click", () => {
  inputSearch.value = ""
  buttonRemoveSearch.classList.add("btn-close-hidden")
})

inputSearch.addEventListener("keydown", (e) => {
  buttonRemoveSearch.classList.remove("btn-close-hidden")
  if (e.keyCode === 13) {
    e.preventDefault();
    search(initialCards, inputSearch)
    removeAllCards()
    rendererCard(card)
  }
})

buttonSearch.addEventListener("click", () => {
  search(initialCards, inputSearch)
  removeAllCards()
  rendererCard(card)
})

function removeAllCards() {
  document.querySelectorAll("#cards").forEach((el) => { el.remove("cards") })
}