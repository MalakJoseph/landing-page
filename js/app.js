// helpers

/**
 * Calculate whether the element is in the viewport
 * Credits: https://stackoverflow.com/a/7557433
 */
function isInViewport(elem) {
  const rect = elem.getBoundingClientRect();

  return (
    rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) / 2 &&
    rect.right >=
      (window.innerWidth || document.documentElement.clientWidth) / 2 &&
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) / 2 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) / 2
  );
}

// ----

const sections = document.querySelectorAll("section");

// create the nav with its elements
function createNavMenu() {
  const navbar = document.getElementById("navbar__list");
  sections.forEach((section) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#${section.id}" class='menu__link'>${section.dataset.nav}</a>`;
    navbar.appendChild(li);
  });

  // scroll to selected section
  const links = document.querySelectorAll(".menu__link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// add class active for both, sections and links
function addActiveClassToCurrrentSection() {
  const addActiveClass = (isInViewport) => {
    document.addEventListener("scroll", () => {
      sections.forEach((section) => {
        const link = document.querySelector(`a[href^="#${section.id}"]`);
        isInViewport(section)
          ? (section.classList.add("active"), link.classList.add("active"))
          : (section.classList.remove("active"),
            link.classList.remove("active"));
      });
    });
  };
  addActiveClass(isInViewport);
}

// hide navbar if not scroll for 2 sec
function hideNavbar() {
  let timer = null;
  const navbar = document.querySelector(".page__header");
  window.addEventListener("scroll", () => {
    if (timer !== null) {
      clearTimeout(timer);
      navbar.style.top = 0;
    }
    timer = setTimeout(() => {
      navbar.style.top = "-50px";
    }, 2000);
  });
}

// show scroll__to__top button
function scrollToTop() {
  const button = document.querySelector(".scroll__to__top");

  function handleScroll() {
    if (window.scrollY <= 550) {
      button.style.display = "none";
      return;
    }
    button.style.display = "block";
  }
  window.addEventListener("scroll", handleScroll);

  // go up
  button.addEventListener("click", () => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
    });
  });
}

function init() {
  createNavMenu();
  scrollToTop();
  hideNavbar();
  addActiveClassToCurrrentSection();
}

init();
