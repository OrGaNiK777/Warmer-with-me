import { initialCards } from '../init/cards.js';

const inputSearch = document.querySelector(".input-search")
const buttonSearch = document.querySelector("#button-search")
const buttonRemoveSearch = document.querySelector(".button-remove-search")
const zoomImg = document.querySelector(".zoomImg")
const mainSmart = document.querySelector(".main-smart")
const buttonMainSmart1 = document.querySelector(".main-smart-button1")
const buttonMainSmart2 = document.querySelector(".main-smart-button2")
let searchCard = []



buttonMainSmart1.addEventListener("click", () => {
  const filt = initialCards.filter((item) => { if (item.status === "В наличии") { return true } })
  searchCard = filt
  rendererCard(searchCard)
})

buttonMainSmart2.addEventListener("click", () => {
  const filt = initialCards.filter(item => { if (item.status === "Под заказ") { return true } })
  searchCard = filt
  rendererCard(searchCard)
})

function search(items, search) {
  const filt = items.filter(el => {
    return (el.name + " " + el.about + " " + el.description + " " + el.status).toLowerCase().trim().
      includes(search.value.toLowerCase().trim());
  })
  searchCard = filt
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
  cardTemplate.querySelector(".description").innerText = item.description;
  cardTemplate.querySelector('.slide').id = item.id;


  const carouselControlPrev = cardTemplate.querySelector('.carousel-control-prev')
  const carouselControlNext = cardTemplate.querySelector('.carousel-control-next')
  const description = cardTemplate.querySelector(".description")
  const price = cardTemplate.querySelectorAll(".price")
  const discount = cardTemplate.querySelectorAll(".discount")
  const discountProc = cardTemplate.querySelectorAll(".discount-proc")
  const link1 = cardTemplate.querySelector(".link1")
  const link2 = cardTemplate.querySelector(".link2")
  const link3 = cardTemplate.querySelector(".link3")
  const link4 = cardTemplate.querySelector(".link4")
  const videoSlide = cardTemplate.querySelector(".video-slide")
  const carouselItem1 = cardTemplate.querySelector(".carousel-item1")
  const carouselItem2 = cardTemplate.querySelector(".carousel-item2")
  const carouselItem3 = cardTemplate.querySelector(".carousel-item3")
  const carouselItem4 = cardTemplate.querySelector(".carousel-item4")
  const carouselItem5 = cardTemplate.querySelector(".carousel-item5")
  const status = cardTemplate.querySelector(".availability")

  carouselControlPrev.href = "#" + item.id;
  carouselControlNext.href = "#" + item.id;

  if (item.status === "Под заказ") {
    description.innerText = `Заказ по индивидуальным размерам, возможен повтор в любом оттенке`
    status.classList.add("btn-order")
    status.textContent = item.status
    if (item.status.le) { }
  } else {
    description.innerText = item.description;
    status.textContent = item.status
  }

  if (!item.link1) {
    carouselItem1.remove("carousel-item1")
  } else {
    link1.src = item.link1;
    link1.alt = item.name;
  }

  if (!item.link2) {
    carouselItem2.remove("carousel-item2")
  } else {
    link2.src = item.link2;
    link2.alt = item.name;
  }

  if (!item.link3) {
    carouselItem3.remove("carousel-item3")
  } else {
    link3.src = item.link3;
    link3.alt = item.name;
  }

  if (!item.link4) {
    carouselItem4.remove("carousel-item4")
  } else {
    link4.src = item.link4;
    link4.alt = item.name;
  }

  if (!item.video) {
    carouselItem5.remove("carousel-item5")
  } else {
    videoSlide.innerHTML = `<iframe class="video" src=${item.video} frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`
  }

  if (!item.video & !item.link2) {
    carouselControlPrev.remove('carousel-control-prev')
    carouselControlNext.remove('carousel-control-next')
  }

  link1.addEventListener("click", () => {
    zoomImg.src = item.link1
  })
  link2.addEventListener("mousedown", () => {
    zoomImg.src = item.link2
  })
  link3.addEventListener("mousedown", () => {
    zoomImg.src = item.link3
  })
  link4.addEventListener("mousedown", () => {
    zoomImg.src = item.link4
  })

  if (item.price) {
    price.forEach((el) => { el.textContent = item.price + " ₽"; })
  } else { price.forEach((el) => { el.textContent = "Уточнить лично" }) }

  if (item.discount) {
    discountProc.forEach(el => { el.textContent = "-" + item.discount + "%"; el.classList.add("d-block") })
    price.forEach((el) => {
      el.classList.add("price-discount");
      discount.forEach(el => { el.textContent = item.price - (item.price * item.discount / 100) + " ₽"; el.classList.add("d-block") })
    })
  }

  return cardTemplate;
}

function rendererCard(items) {
  mainSmart.classList.remove("main-smart-visib")
  items.forEach((item) => {
    if (item.name) {
      document.querySelector(".cards-list").append(createCards(item))
    };
  });
}

if (document.documentElement.clientWidth > 500) { rendererCard(initialCards) }
if (document.documentElement.clientWidth < 500) { mainSmart.classList.add("main-smart-visib") }