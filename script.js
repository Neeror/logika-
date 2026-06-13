document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const brand = this.dataset.brand;

    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("on"));
    this.classList.add("on");

    document.querySelectorAll(".cars-grid > li").forEach((li) => {
      const card = li.querySelector(".card");
      li.style.display = (brand === "all" || card.dataset.brand === brand) ? "" : "none";
    });
  });
});

document.querySelectorAll(".brand-nm").forEach((nm) => {
  nm.addEventListener("click", function () {
    const wasOn = this.classList.contains("on");
    document.querySelectorAll(".brand-nm").forEach((n) => n.classList.remove("on"));
    if (!wasOn) this.classList.add("on");
  });
});

const BRAND_TO_ID = {
  "BMW": "bmw",
  "Mercedes-Benz": "mercedes",
  "Porsche": "porsche",
  "Audi": "audi",
  "Range Rover": "range-rover",
  "Tesla": "tesla"
};

document.querySelectorAll(".cars-grid > li").forEach((li) => {
  li.addEventListener("click", () => {
    const card = li.querySelector(".card");
    const id = BRAND_TO_ID[card.dataset.brand];
    if (id) window.location.href = "car.html?id=" + id;
  });
});