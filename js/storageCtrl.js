const StorageCtrl = (function () {
  return {
    // Get items from storage
    getItems: () => {
      let storage = [];

      if (localStorage.getItem("pizza") === null) {
        storage = [];
      } else {
        storage = JSON.parse(localStorage.getItem("pizza"));
      }

      return storage;
    },

    // Store new items
    storeItem: (item) => {
      let storage = StorageCtrl.getItems();

      storage.push(item);
      localStorage.setItem("pizza", JSON.stringify(storage));
    },

    // Remove item from localstorage
    removeFromStore: (id) => {
      let storage = StorageCtrl.getItems();

      storage = storage.filter((item) => item.id !== id);

      localStorage.setItem("pizza", JSON.stringify(storage));
    },
  };
})();
