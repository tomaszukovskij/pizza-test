const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  const events = () => {
    const UISelectors = UICtrl.getSelectors();

    UISelectors.form.addEventListener("submit", submit);
    UISelectors.addToppingEl.addEventListener("click", addMoreTopping);
    UISelectors.itemList.addEventListener("click", removeItem);
    UISelectors.sortName.addEventListener("click", sortByName);
    UISelectors.sortPrice.addEventListener("click", sortByPrice);
    UISelectors.sortHeat.addEventListener("click", sortByHeat);
  };

  const submit = (e) => {
    const formInput = UICtrl.getInputValues();
    UICtrl.hideList(false);

    console.log(formInput.toppings);

    if (
      formInput.name !== "" &&
      formInput.price !== "" &&
      formInput.toppings.length >= 2
    ) {
      ItemCtrl.addItem(formInput);
      StorageCtrl.storeItem(newItem);
      UICtrl.addListItem(newItem);
      UICtrl.clearFields();
    } else {
      UICtrl.showError("Please fill all required fields.");
    }

    e.preventDefault();
  };

  const addMoreTopping = (e) => {
    UICtrl.addMpreToppings();
  };

  const removeItem = (e) => {
    if (e.target.classList.contains("remove-btn")) {
      UICtrl.showModal(true);
      modalStatus(e);
    }
  };

  const modalStatus = (event) => {
    const UISelectors = UICtrl.getSelectors();
    UISelectors.yesBtn.addEventListener("click", () => {
      const itemId = parseInt(event.target.closest(".item").dataset.id);
      UICtrl.removeItem(itemId);
      ItemCtrl.removeItem(itemId);
      StorageCtrl.removeFromStore(itemId);
      UICtrl.showModal(false);
    });
    UISelectors.noBtn.addEventListener("click", () => {
      UICtrl.showModal(false);
    });
  };

  const sortByName = () => {
    const sorted = ItemCtrl.sortByName();
    UICtrl.populateList(sorted);
  };

  const sortByPrice = () => {
    const sorted = ItemCtrl.sortByPrice();
    UICtrl.populateList(sorted);
  };

  const sortByHeat = () => {
    const sorted = ItemCtrl.sortByHeat();
    UICtrl.populateList(sorted);
  };

  return {
    init: () => {
      let storadeItems = StorageCtrl.getItems();
      if (storadeItems.length === 0) {
        UICtrl.hideList(true);
      } else {
        UICtrl.hideList(false);
        UICtrl.populateList(storadeItems);
      }
      events();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
