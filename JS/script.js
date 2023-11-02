"use strict";

// --> Slider
const body = document.querySelector("body");
const menuBtn = document.querySelector("#label");
const slider = document.querySelector(".nav__list");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", function () {
  body.classList.toggle("scroll--lock");
  slider.classList.toggle("slider--active");
  overlay.classList.toggle("overlay--active");
});
/////////////////////////////////////////////

// --> Intersection Observer
const header = document.querySelector(".header");
const bkImage = document.querySelector(".background__img");
const observeHeader = function (item, observer) {
  let [bkImg] = item;

  if (bkImg.isIntersecting) {
    header.classList.remove("header--active");
  } else {
    header.classList.add("header--active");
  }
};

const option = {
  root: null,
  threshold: 0,
  rootMargin: "0px",
};
const observer = new IntersectionObserver(observeHeader, option);
observer.observe(bkImage);
/////////////////////////////////////////////

// --> POPUP MENU Functions
const overlay_2 = document.querySelector(".overlay--2");
const popupSection = document.querySelector(".popup-menu");
const fundingSection = document.querySelector(".funding-section");
const successfulSection = document.querySelector(".successful");
const popupCard = document.querySelector(".cards__pop");
const usualCard = document.querySelector(".cards");
const cardmdfs = document.querySelectorAll(".card--mdf");
const inputCheckbox = document.querySelectorAll(".card__checkbox");
const pledgeBoxes = document.querySelectorAll(".pledge__box");
const backProjectBtn = document.getElementById("back-thisProject");
const closeBtn = document.querySelector(".close");
const bookmarkBtn = document.getElementById("bookmarkBtn");

// Reset
const resetSelectedCards = function () {
  inputCheckbox.forEach((item) => (item.checked = false));
  pledgeBoxes.forEach((item) => item.classList.remove("pledge__box--active"));
  cardmdfs.forEach((item) => item.classList.remove("border--update"));
};

// Show and Hide
const showAndHide = function () {
  fundingSection.classList.toggle("hidden");
  popupSection.classList.toggle("hidden");
  overlay_2.classList.toggle("overlay--active");
};

// Select card
const checkedFunction = function (ind) {
  resetSelectedCards();
  const cardmdf = document.querySelector(`.card--mdf-${ind}`);
  const pledgeBox = document.querySelector(`.pledge__box--${ind}`);

  inputCheckbox[ind].checked = true;
  cardmdf.classList.add("border--update");

  if (!pledgeBox) return;
  pledgeBox.classList.add("pledge__box--active");
};

// Open and Cloes Popup Menu
backProjectBtn.addEventListener("click", function () {
  showAndHide();
  resetSelectedCards();
  window.scrollTo({ left: 0, top: 0 });
});
closeBtn.addEventListener("click", showAndHide);

// Bookmark
bookmarkBtn.addEventListener("click", function () {
  document.querySelector(".bookmark").classList.toggle("btn--mdf2--active");
  this.classList.toggle("btn--mdf2--active-2");
});

// Select Card
popupCard.addEventListener("click", function (e) {
  const target = e.target.closest(".card__sub-pop");

  if (!target) return;
  checkedFunction(target.dataset.checkbox);
});

// Select from fundraising page
usualCard.addEventListener("click", function (e) {
  const target = e.target.classList.contains("btn--mdf");
  const target_2 = e.target.closest(".card");

  if (!target) return;
  showAndHide();
  checkedFunction(target_2.dataset.card__popup);

  const cardPop = document.querySelector(
    `.card__pop--${target_2.dataset.card__popup}`
  );

  cardPop.scrollIntoView({
    block: "center",
  });
});
/////////////////////////////////////////////

// --> Amount, day left, totalback logic
const backedAmount = document.querySelector('[data-data="1"]');
const totalBack = document.querySelector('[data-data="2"]');
const dayLeft = document.querySelector('[data-data="3"]');
const range = document.getElementById("range");
const bambooStandLeft = document.querySelectorAll(".bambooStandLeft");
const blackEditionLeft = document.querySelectorAll(".blackEditionLeft");
const takeAmt = document.querySelectorAll(".enter-amount");
const bambooAmt = document.querySelector(".bamboo__amt");
const blackEditionAmt = document.querySelector(".blackedition__amt");
const btnNoreward = document.querySelector(".btn_noreward");
const bambooBtn = document.querySelector(".btnBamboo");
const blackEditionBtn = document.querySelector(".btnBlackEdition");
const successfulCard = document.querySelector(".successful");
const gotItBtn = document.querySelector(".gotIt-btn");

let backAmt = 89914;
let total__back = 5007;
let days = 56;
let bamboo__left = 101;
let blackEdition__left = 64;
let stockLeft;

(function () {
  backedAmount.textContent = backAmt;
  totalBack.textContent = total__back;
  dayLeft.textContent = days;
})();

const showSuccessfulMessage = function () {
  popupSection.classList.toggle("hidden");
  overlay_2.classList.add("overlay--active");
  successfulCard.classList.toggle("hidden");
};

const updateFund = function (num, left, product) {
  if (num === 0) {
    return;
  } else {
    backAmt += num;
    total__back++;
    stockLeft = left - 1;
    backedAmount.textContent = backAmt;
    totalBack.textContent = total__back;

    if (product === "Bamboo") {
      bambooStandLeft.forEach((item) => (item.textContent = stockLeft));
    } else {
      blackEditionLeft.forEach((item) => (item.textContent = stockLeft));
    }

    showSuccessfulMessage();
  }
  takeAmt.forEach((item) => (item.value = ""));
};

btnNoreward.addEventListener("click", function () {
  total__back++;
  totalBack.textContent = total__back;
  showSuccessfulMessage();
});

bambooBtn.addEventListener("click", function () {
  let value = Number(bambooAmt.value);
  bamboo__left = Number(document.querySelector(".bambooStandLeft").textContent);
  updateFund(value, bamboo__left, "Bamboo");
});

blackEditionBtn.addEventListener("click", function () {
  let value = Number(blackEditionAmt.value);
  blackEdition__left = Number(
    document.querySelector(".blackEditionLeft").textContent
  );
  updateFund(value, blackEdition__left, "BlackEdition");
});

gotItBtn.addEventListener("click", function () {
  fundingSection.classList.toggle("hidden");
  overlay_2.classList.toggle("overlay--active");
  successfulCard.classList.toggle("hidden");
});

/////////////////////////////////////////////
