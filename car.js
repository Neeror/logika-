(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const car = CARS[id];
  
    if (!car) {
      window.location.href = "index.html";
      return;
    }
  
    document.title = car.brand + " " + car.model + " — MotorElite";
  
    document.getElementById("js-img").src = car.img;
    document.getElementById("js-img").alt = car.brand + " " + car.model;
  
    const badgeEl = document.getElementById("js-badge");
    if (car.badge) {
      badgeEl.textContent = car.badge;
    } else {
      badgeEl.style.display = "none";
    }
  
    document.getElementById("js-brand").textContent = car.brand + " · " + car.year;
    document.getElementById("js-name").textContent = car.model;
    document.getElementById("js-price").innerHTML = "₴" + car.price + " <span class=\"price-unit\">грн</span>";
  
    document.getElementById("js-title").innerHTML = car.brand + " <em>" + car.model + "</em>";
    document.getElementById("js-desc").textContent = car.desc;
  
    let specsHTML = "";
    car.extSpecs.forEach((s) => {
      specsHTML += "<tr><td class=\"spec-table-k\">" + s[0] + "</td><td class=\"spec-table-v\">" + s[1] + "</td></tr>";
    });
    document.getElementById("js-specs").innerHTML = specsHTML;
  
    const quickItems = [
      { val: car.hp + " к.с.", key: "Потужність" },
      { val: car.body,         key: "Кузов" },
      { val: car.fuel,         key: "Паливо" },
      { val: String(car.year), key: "Рік" }
    ];
    let quickHTML = "";
    quickItems.forEach((item) => {
      quickHTML += "<li class=\"car-quick-item\"><span class=\"car-quick-val\">" + item.val + "</span><span class=\"car-quick-key\">" + item.key + "</span></li>";
    });
    document.getElementById("js-quick").innerHTML = quickHTML;
  
    let relatedHTML = "";
    car.related.forEach((relId) => {
      const rel = CARS[relId];
      if (!rel) return;
      relatedHTML += renderCard(rel);
    });
    document.getElementById("js-related").innerHTML = relatedHTML;
  
    document.querySelectorAll("#js-related .card").forEach((card) => {
      card.addEventListener("click", function () {
        window.location.href = "car.html?id=" + this.dataset.id;
      });
    });
  
    document.getElementById("js-form").addEventListener("submit", function (e) {
      e.preventDefault();
      this.innerHTML = "<p class=\"form-success\">✓ Дякуємо! Ваша заявка прийнята. Ми зателефонуємо вам найближчим часом.</p>";
    });
  })();
  
  function renderCard(car) {
    return "<li><article class=\"card\" data-id=\"" + car.id + "\">" +
      "<figure class=\"card-img\">" +
      "<img src=\"" + car.img + "\" alt=\"" + car.brand + " " + car.model + "\">" +
      (car.badge ? "<span class=\"card-tag\">" + car.badge + "</span>" : "") +
      "</figure>" +
      "<div class=\"card-body\">" +
      "<p class=\"card-brand\">" + car.brand + " · " + car.year + "</p>" +
      "<h3 class=\"card-model\">" + car.model + "</h3>" +
      "<dl class=\"card-specs\">" +
      "<div><dt class=\"spec-k\">Потужність</dt><dd class=\"spec-v\">" + car.hp + " к.с.</dd></div>" +
      "<div><dt class=\"spec-k\">Кузов</dt><dd class=\"spec-v\">" + car.body + "</dd></div>" +
      "<div><dt class=\"spec-k\">Паливо</dt><dd class=\"spec-v\">" + car.fuel + "</dd></div>" +
      "</dl>" +
      "<footer class=\"card-foot\">" +
      "<p><strong class=\"card-price\">₴" + car.price + "</strong><span class=\"price-unit\">грн</span></p>" +
      "<span class=\"card-arr\">→</span>" +
      "</footer></div></article></li>";
  }
  