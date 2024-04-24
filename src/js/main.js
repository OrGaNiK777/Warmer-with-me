import { initialCards } from '../init/cards.js';

const inputSearch = document.querySelector(".input-search")
const buttonSearch = document.querySelector("#button-search")
const buttonRemoveSearch = document.querySelector(".button-remove-search")
const zoomImg = document.querySelector(".zoomImg")
let searchCard = []

function search(items, search) {
  const filt = items.filter(el => {
    return (el.name + " " + el.about + " " + el.description).toLowerCase().trim().
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
  cardTemplate.querySelector(".description").innerText = item.description;
  cardTemplate.querySelector('.slide').id = item.id;
  cardTemplate.querySelector('.carousel-control-prev').href = "#" + item.id;
  cardTemplate.querySelector('.carousel-control-next').href = "#" + item.id;

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

  if (item.status === "Под заказ") {
    description.innerText = "Заказ по индивидуальным размерам"

    status.classList.add("btn-order")
    status.textContent = item.status
    if (item.status.le) { }
  } else {
    description.innerText = item.description;
    status.textContent = item.status
  }

  if (item.link1) {
    link1.src = item.link1;
    link1.alt = item.name;
  } else {
    carouselItem1.remove("carousel-item1")
  }
  if (item.link2) {
    link2.src = item.link2;
    link2.alt = item.name;
  } else {
    carouselItem2.remove("carousel-item2")
  }
  if (item.link3) {
    link3.src = item.link3;
    link3.alt = item.name;
  } else {
    carouselItem3.remove("carousel-item3")
  }
  if (item.link4) {
    link4.src = item.link4;
    link4.alt = item.name;
  } else {
    carouselItem4.remove("carousel-item4")
  }
  if (item.video) {
    videoSlide.src = item.video
  } else {
    carouselItem5.remove("carousel-item5")
  }

  link1.addEventListener("mousedown", () => {
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
  items.forEach((item) => {
    document.querySelector(".cards-list").append(createCards(item));
  });
}

rendererCard(initialCards)