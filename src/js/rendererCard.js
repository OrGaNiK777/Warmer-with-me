const zoomImg = document.querySelector(".zoomImg")
const mainSmart = document.querySelector(".main-smart")

function clear(num) { return Number(num ? num.replace(/\D/g, "") : 0) } // переводит в число и оставляет цифры

function createCards(item) {
  const cardTemplate = document.getElementById("card-template").content.querySelector(".col").cloneNode(true);
  cardTemplate.querySelector(".name").textContent = item.name;
  cardTemplate.querySelector(".about").textContent = item.about;
  cardTemplate.querySelector(".description").innerText = item.description;
  cardTemplate.querySelector('.slide').id = item.id;

  const title = cardTemplate.querySelector('.title')
  const carouselControlPrev = cardTemplate.querySelector('.carousel-control-prev')
  const carouselControlNext = cardTemplate.querySelector('.carousel-control-next')
  const description = cardTemplate.querySelector(".description")
  const price = cardTemplate.querySelector(".price")
  const delivery = cardTemplate.querySelector(".delivery")
  const discount = cardTemplate.querySelector(".discount")
  const discountProc = cardTemplate.querySelector(".discount-proc")
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
    !item.description ? description.innerText = `Заказ по индивидуальным размерам, 
    Возможен повтор в любом цвете`: description.textContent = item.description
    status.classList.add("btn-order")
    status.textContent = item.status

  } else {
    description.innerText = item.description;
    status.textContent = item.status
  }

  // if (item.name.length > 19) {
  //   title.classList.add("col-6")
  //   description.classList.add("col-6")
  // }

  // if (item.name.length < 19) {
  //   title.classList.add("col-6")
  //   description.classList.add("col-6")
  // }

  !item.link1 ? carouselItem1.remove("carousel-item1") : link1.src = item.link1; link1.alt = item.name;
  !item.link2 ? carouselItem2.remove("carousel-item2") : link2.src = item.link2; link2.alt = item.name;
  !item.link3 ? carouselItem3.remove("carousel-item3") : link3.src = item.link3; link3.alt = item.name;
  !item.link4 ? carouselItem4.remove("carousel-item4") : link4.src = item.link4; link4.alt = item.name;
  !item.video ? carouselItem5.remove("carousel-item5") : videoSlide.innerHTML =
    `<iframe class="video" src=${item.video}  frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"></iframe>`

  if (!item.video & !item.link2) {
    carouselControlPrev.remove('carousel-control-prev')
    carouselControlNext.remove('carousel-control-next')
  }

  link1.addEventListener("click", () => {
    zoomImg.src = item.link1
  })
  link2.addEventListener("click", () => {
    zoomImg.src = item.link2
  })
  link3.addEventListener("click", () => {
    zoomImg.src = item.link3
  })
  link4.addEventListener("click", () => {
    zoomImg.src = item.link4
  })

  if (item.price) {
    price.textContent = item.price;
  } else { price.textContent = "Уточнить лично" }
  
  if (item.delivery) {
    delivery.textContent = "+ доставка"
  }

  if (item.discount) {
    discountProc.textContent = "-" + item.discount + "%"; discountProc.classList.add("d-block")
    price.classList.add("price-discount");
    discount.textContent = clear(item.price) - (clear(item.price) * item.discount / 100) + " ₽"; discount.classList.add("d-block")
  }

  return cardTemplate;
}

export default function rendererCard(items) {

  mainSmart.classList.remove("main-smart-visib")
  items.forEach((item) => {
    if (item.name) {
      document.querySelector(".cards-list").append(createCards(item))
    };
  });
}