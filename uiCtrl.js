const UICtrl = (function () {
  const UISelectors = {
    inputName: document.querySelector("#name"),
    inputPrice: document.querySelector("#price"),
    inputHeat: document.querySelector("#heat"),
    inputToppings: document.getElementsByName("toppings[]"),
    inputPhoto: document.querySelector("#photo"),
    form: document.querySelector("form"),
    toppingsList: document.querySelector("#toppings"),
    addToppingEl: document.querySelector("#addMoreToppings"),
    itemList: document.querySelector("#items-list"),
    listSection: document.querySelector("#list"),
    modal: document.querySelector("#modal"),
    yesBtn: document.querySelector("#yes"),
    noBtn: document.querySelector("#no"),
    sortName: document.querySelector("#sort-name"),
    sortPrice: document.querySelector("#sort-price"),
    sortHeat: document.querySelector("#sort-heat"),
  };

  return {
    populateList: (items) => {
      UISelectors.itemList.innerHTML = "";
      items.forEach((item) => {
        UICtrl.addListItem(item);
      });
    },
    getInputValues: () => {
      const toppings = [];
      UISelectors.inputToppings.forEach((item) => {
        item.value !== "" ? toppings.push(item.value) : "";
      });

      return {
        name: UISelectors.inputName.value,
        price: UISelectors.inputPrice.value,
        heat: UISelectors.inputHeat.value,
        toppings: toppings,
        photo: UISelectors.inputPhoto.value,
      };
    },
    addMpreToppings: () => {
      const newInput = `
        <input type="text" name="toppings[]" />
      `;

      UISelectors.toppingsList.insertAdjacentHTML("beforeend", newInput);
    },
    addListItem: (item) => {
      const photoId = item.photo;
      let photoEl = "",
        heatEl = "",
        heatNumber = item.heat;
      if (photoId !== "none") {
        photoEl = `<img src="img/pizza${photoId}.jpg"/>`;
      } else {
        photoEl = `<img src="img/pizzaSlice.png"/>`;
      }

      if (heatNumber) {
        let heatCount = "";
        for (var i = 0; i < heatNumber; i++) {
          heatNumber > 3 ? (heatNumber = 3) : "";
          heatCount += `
          <span class="icon icon--heat"></span>
        `;
        }

        heatEl = `<div class="item__heat">${heatCount}</div>`;
      }

      const newItem = `
        <div class="item" data-id="${item.id}">
          <div class="item__image">
            ${photoEl}
            </div>
            <div class="item__info">
              <div class="item__wrap">
                <h2>${item.name}</h2>
                ${heatEl}
              </div>
              <div class="item__wrap item__wrap--column item__toppings"><label>Toppings:</label> <p>${item.toppings}</p></div>
              <div class="item__wrap item__wrap--column"><label>Price:</label> <span class="price">${item.price}€</span></div>
            </div>
            <button type="button" class="remove-btn btn btn--secondary">Remove</button>
          </div>
      `;

      UISelectors.itemList.insertAdjacentHTML("beforeend", newItem);

      console.log(item);
    },
    removeItem: (id) => {
      document.querySelector("[data-id='" + id + "']").remove();
    },
    showModal: (status) => {
      status
        ? UISelectors.modal.classList.add("show")
        : UISelectors.modal.classList.remove("show");
    },
    hideList: (status) => {
      if (status) {
        UISelectors.listSection.style.display = "none";
      } else {
        UISelectors.listSection.style.display = "block";
      }
    },
    showError: (msg) => {
      let error = `
        <p class="error">${msg}</p>
      `;

      UISelectors.form.insertAdjacentHTML("beforeend", error);

      setTimeout(() => {
        document.querySelector(".error").remove();
      }, 2000);
    },
    clearFields() {
      UISelectors.inputName.value = "";
      UISelectors.inputPrice.value = "";
      UISelectors.inputHeat.value = "";
      UISelectors.inputPhoto.value = "none";
      UISelectors.inputToppings.forEach((item) => {
        item.value = "";
      });
    },
    getSelectors: () => {
      return UISelectors;
    },
  };
})();
