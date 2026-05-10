//selected Elements
const settingsIcon = document.querySelector(".toggle-setting .fa-gear");
const settingsBox = document.querySelector(".settings-box");
const colorsLi = document.querySelectorAll(".colors-list li");
const landingPage = document.querySelectorAll(".landing-page .back-image img");
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
const aboutUsImag = document.querySelector(".about-us .image-box img");
const ourSkills = document.querySelector(".skills");
const allSkills = document.querySelectorAll(".skill-box .skill-progress span");
const ourGallery = document.querySelectorAll(".gallery img");
const navBullets = document.querySelector(".nav-bullets");
const allLinks = document.querySelectorAll(".links a");
const bulletSpan = document.querySelectorAll(".bullets-option span");
const toggleBtn = document.querySelector(".toggle-menu");
const tLinks = document.querySelector(".links");

//variables
let arrayKeyOfLocalStorage = ["random_backgrounds", "background", "bullets_option", "color_option"];
let mainColor = localStorage.getItem("color_option");
let randomBack = localStorage.getItem("random_backgrounds");
let background = localStorage.getItem("background");
let bulletLocalItem = localStorage.getItem("bullets_option");

//chang background imag landing
function randomizeImgs(backgroundOption) {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * landingPage.length);
      landingPage.forEach((element) => {
        element.classList.remove("active");
      });
      landingPage[randomNumber].classList.add("active");
      localStorage.setItem("background", landingPage[randomNumber].dataset.img);
    }, 3000);
  } else {
    clearInterval(backgroundInterval);
  }
}

randomizeImgs(true);

//active class function local Storage
function activeToggleEl(elements, dataAttribute, value) {
  elements.forEach((el) => {
    const elData = el.dataset[dataAttribute];
    elData === value ? el.classList.add("active") : el.classList.remove("active");
  });
}

//get local Storage
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  activeToggleEl(colorsLi, "color", mainColor);
  aboutUsImag.src = `imgs/amico-${Array.from(mainColor).slice(1, mainColor.length).join("")}.png`;
}

if (randomBack !== null) {
  activeToggleEl(randomBackEl, "bck", randomBack);
  randomBack == "yes" ? randomizeImgs(true) : randomizeImgs(false);
}

if (background !== null) {
  activeToggleEl(landingPage, "img", background);
}

if (bulletLocalItem !== null) {
  navBullets.style.display = bulletLocalItem;

  activeToggleEl(bulletSpan, "display", bulletLocalItem);
}

//Toggle  class  spin & open
settingsIcon.onclick = function () {
  this.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
};

//Switch Main colors
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    const color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);

    localStorage.setItem("color_option", color);

    HandelActive(e);

    aboutUsImag.src = `imgs/amico-${Array.from(color).slice(1, color.length).join("")}.png`;
  });
});

//Switch Background
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    const back = e.target.dataset.bck;

    localStorage.setItem("random_backgrounds", back);

    HandelActive(e);

    back === "yes" ? randomizeImgs(true) : randomizeImgs(false);
  });
});

window.onscroll = function () {
  // المسافة بين لاب ولابن
  let skillsOffsetTop = ourSkills.offsetTop;

  // ارتفاع الابن
  let skillsOuterHeight = ourSkills.offsetHeight;

  //ارتفاع النافذة
  let windowHeight = this.innerHeight;

  //ماهو المكان لي راني فيه
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};

// Create Popup With The Image

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//generate Bullets
allLinks.forEach((element) => {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.dataset.section = element.dataset.section;
  let tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = element.textContent;
  bullet.appendChild(tooltip);
  navBullets.appendChild(bullet);
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//دالة التي تعمل سكرول لعناصر
function ScrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
ScrollToSomewhere(allLinks);
ScrollToSomewhere(allBullets);

//Handel Active State
function HandelActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  ev.target.classList.add("active");
}

//
bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    navBullets.style.display = e.target.dataset.display;
    localStorage.setItem("bullets_option", e.target.dataset.display);
    HandelActive(e);
  });
});

//
allLinks.forEach((links) => {
  links.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

//Rest Button
document.querySelector(".reset-options").onclick = function () {
  arrayKeyOfLocalStorage.forEach((element) => {
    localStorage.removeItem(element);
  });
  window.location.reload();
};

//toggle menu && tLinks
toggleBtn.onclick = function (e) {
  //عندا لكيل العنصر ما يجيبليش ابنائه
  e.stopPropagation();

  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

tLinks.onclick = function (e) {
  //عندا لكيل العنصر ما يجيبليش ابنائه
  e.stopPropagation();
};

//Click anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    toggleBtn.classList.remove("menu-active");
    tLinks.classList.remove("open");
  }
});
