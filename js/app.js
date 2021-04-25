const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // DOM events
  const events = () => {
    const UISelectors = UICtrl.getSelectors();

    UISelectors.form.addEventListener("submit", submit);
    UISelectors.addToppingEl.addEventListener("click", addMoreTopping);
    UISelectors.itemList.addEventListener("click", removeItem);
    UISelectors.sortName.addEventListener("click", sortByName);
    UISelectors.sortPrice.addEventListener("click", sortByPrice);
    UISelectors.sortHeat.addEventListener("click", sortByHeat);
  };

  // Submit form, add to localstorage
  const submit = (e) => {
    const formInput = UICtrl.getInputValues();

    if (
      formInput.name !== "" &&
      formInput.price !== "" &&
      formInput.toppings.length >= 2
    ) {
      //Show items list in DOM
      UICtrl.hideList(false);
      // Add item and return newItem Obj
      ItemCtrl.addItem(formInput);
      // Add returned Obj to storage
      StorageCtrl.storeItem(newItem);
      // Add returned Obj to UI
      UICtrl.addListItem(newItem);
      // Clear all input fields
      UICtrl.clearFields();
      // This reload its a nasty cheat ..
      // If you remove this line and remove few items from DOm,
      // at the second event you will see an error. Couldn handle to fix it :/
      location.reload();
    } else {
      UICtrl.showError("Please fill all required fields.");
    }

    e.preventDefault();
  };

  // Add more toppings on click
  const addMoreTopping = (e) => {
    UICtrl.addMpreToppings();
  };

  // Remove item with modal popup
  const removeItem = (e) => {
    if (e.target.classList.contains("remove-btn")) {
      UICtrl.showModal(true);
      modalStatus(e);
    }
  };

  // Remove item if modal status true or false
  const modalStatus = (event) => {
    const UISelectors = UICtrl.getSelectors();
    UISelectors.yesBtn.addEventListener("click", () => {
      const itemId = parseInt(event.target.closest(".item").dataset.id);
      UICtrl.removeItem(itemId);
      ItemCtrl.removeItem(itemId);
      StorageCtrl.removeFromStore(itemId);
      UICtrl.showModal(false);

      const storadeItemsLength = checkStoredItems();
      if (!storadeItemsLength) {
        UICtrl.hideList(true);
        location.reload();
      }
    });
    UISelectors.noBtn.addEventListener("click", () => {
      UICtrl.showModal(false);
    });
  };

  // Sort
  const sortByName = () => {
    const sorted = ItemCtrl.sortByName();
    UICtrl.populateList(sorted);
  };

  // Sort
  const sortByPrice = () => {
    const sorted = ItemCtrl.sortByPrice();
    UICtrl.populateList(sorted);
  };

  // Sort
  const sortByHeat = () => {
    const sorted = ItemCtrl.sortByHeat();
    UICtrl.populateList(sorted);
  };

  // Check if there is items in localstorage
  const checkStoredItems = () => {
    let storadeItems = StorageCtrl.getItems();

    if (storadeItems.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return {
    init: () => {
      const storadeItemsLength = checkStoredItems(),
        storadeItems = StorageCtrl.getItems();

      // If localstorage is empty dont show item list
      if (!storadeItemsLength) {
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
