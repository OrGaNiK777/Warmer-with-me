const zoomImg = document.querySelector(".zoomImg")
const mainSmart = document.querySelector(".main-smart")

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
  const video = cardTemplate.querySelector(".video")
  const carouselItem2 = cardTemplate.querySelector(".carousel-item2")
  const carouselItem3 = cardTemplate.querySelector(".carousel-item3")
  const carouselItem4 = cardTemplate.querySelector(".carousel-item4")
  const carouselItem5 = cardTemplate.querySelector(".carousel-item5")
  const status = cardTemplate.querySelector(".availability")

  carouselControlPrev.href = "#" + item.id;
  carouselControlNext.href = "#" + item.id;

  if (item.status === "Под заказ") {
    description.innerText = `Заказ по индивидуальным размерам, 
    Возможен повтор в любом цвете`
    status.classList.add("btn-order")
    status.textContent = item.status
    if (item.status.le) { }
  } else {
    description.innerText = item.description;
    status.textContent = item.status
  }

  link1.src = item.link1;
  link1.alt = item.name;
  !item.link2 ? carouselItem2.remove("carousel-item2") : link2.src = item.link2; link2.alt = item.name;
  !item.link3 ? carouselItem3.remove("carousel-item3") : link3.src = item.link3; link3.alt = item.name;
  !item.link4 ? carouselItem4.remove("carousel-item4") : link4.src = item.link4; link4.alt = item.name;
  !item.video ? carouselItem5.remove("carousel-item5") : video.src = item.video

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

export default function rendererCard(items) {
  mainSmart.classList.remove("main-smart-visib")
  items.forEach((item) => {
    if (item.name) {
      document.querySelector(".cards-list").append(createCards(item))
    };
  });
}