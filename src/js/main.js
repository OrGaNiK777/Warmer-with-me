import { initialCards } from '../init/cards.js';
import { slides } from '../init/slides.js';

const inputSearch = document.querySelector(".input-search")
const buttonSearch = document.querySelector("#button-search")
const buttonRemoveSearch = document.querySelector(".button-remove-search")
let searchCard = []

function search(items, search) {
  const filt = items.filter(el => {
    return (el.name + " " + el.about).toLowerCase().trim().
      includes(search.value.toLowerCase().trim());
  })
  searchCard = filt
}

buttonRemoveSearch.addEventListener("click", () => {
  inputSearch.value = ""
  buttonRemoveSearch.classList.add("btn-close-hidden")
  removeAllCards()
  rendererCard(initialCards)
})

inputSearch.addEventListener("keydown", (e) => {
  buttonRemoveSearch.classList.remove("btn-close-hidden")
  if (e.keyCode === 13) {
    e.preventDefault();
    search(initialCards, inputSearch)
    removeAllCards()
    rendererCard(searchCard)
  }
})

buttonSearch.addEventListener("click", () => {
  search(initialCards, inputSearch)
  removeAllCards()
  rendererCard(searchCard)
})

function removeAllCards() {
  document.querySelectorAll("#cards").forEach((el) => { el.remove("cards") })
}

function createCards(item) {
  const cardTemplate = document.getElementById("card-template").content.querySelector(".col").cloneNode(true);
  cardTemplate.querySelector(".name").textContent = item.name;
  cardTemplate.querySelector(".about").textContent = item.about;
  cardTemplate.querySelector('.slide').id = item.id
  cardTemplate.querySelector('.carousel-control-prev').href = "#" + item.id
  cardTemplate.querySelector('.carousel-control-next').href = "#" + item.id
  cardTemplate.querySelectorAll('#buttonSlide').forEach((el) => {
    el.href = "#" + item.id;
  })

  const link1 = cardTemplate.querySelector(".link1")
  const link2 = cardTemplate.querySelector(".link2")
  const link3 = cardTemplate.querySelector(".link3")
  const link4 = cardTemplate.querySelector(".link2")
  const link5 = cardTemplate.querySelector(".link3")
  const videoSlide = cardTemplate.querySelector(".video-slide")
  const zoomImg = document.querySelector(".zoomImg")

  // const carousel = cardTemplate.querySelector(".carousel-inner")

  // function checkLink(link, html) {

  //   console.log(link)
  //   console.log(html)
  //   console.log(carousel)
  //   if (link.length > 1) { carousel.innerHTML = html }
  //   console.log(cardTemplate.querySelector(".carousel-inner"))
  // }


  // slides.forEach(el => {
  //   initialCards.forEach(el1 => { checkLink(el1.link2, el.img2) })
  // })




  if (item.link1) {
    link1.src = item.link1;
    link1.alt = item.name;
  } else { }
  if (item.link2) {
    link2.src = item.link2;
    link2.alt = item.name;
  } else { }
  if (item.link3) {
    link3.src = item.link3;
    link3.alt = item.name;
  } else { }
  if (item.link4) {
    link4.src = item.link4;
    link4.alt = item.name;
  } else { }
  if (item.link5) {
    link5.src = item.link5;
    link5.alt = item.name;
  } else { }
  if (item.video) {
    link5.src = item.link5;
    link5.alt = item.name;
  } else { }

  link1.addEventListener("mousedown", () => {
    zoomImg.src = item.link1
  })
  link2.addEventListener("mousedown", () => {
    zoomImg.src = item.link2
  })
  link3.addEventListener("mousedown", () => {
    zoomImg.src = item.link3
  })

  if (item.price) { cardTemplate.querySelectorAll(".price").forEach((el) => { el.textContent = "Цена: " + item.price + " руб."; }) }
  else { cardTemplate.querySelectorAll(".price").forEach((el) => { el.textContent = "Цена: Узнать лично" }) }
  return cardTemplate;
}

function rendererCard(items) {
  items.forEach((item) => {
    document.querySelector(".cards-list").append(createCards(item));
  });
}

rendererCard(initialCards)