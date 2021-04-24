const StorageCtrl = (function () {
  return {
    getItems: () => {
      let storage = [];

      if (localStorage.getItem("pizza") === null) {
        storage = [];
      } else {
        storage = JSON.parse(localStorage.getItem("pizza"));
      }

      return storage;
    },

    storeItem: (item) => {
      let storage = StorageCtrl.getItems();

      storage.push(item);
      localStorage.setItem("pizza", JSON.stringify(storage));
    },

    removeFromStore: (id) => {
      let storage = StorageCtrl.getItems();

      console.log(id);

      storage = storage.filter((item) => item.id !== id);

      localStorage.setItem("pizza", JSON.stringify(storage));
    },
  };
})();
