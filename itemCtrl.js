const ItemCtrl = (function () {
  const Item = function (id, name, price, heat, toppings, photo) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.heat = heat;
    this.toppings = toppings;
    this.photo = photo;
  };

  const state = {
    items: StorageCtrl.getItems(),
  };

  return {
    addItem: (data) => {
      let id;
      if (state.items.length > 0) {
        id = state.items.length;
      } else {
        id = 0;
      }

      newItem = new Item(
        id,
        data.name,
        data.price,
        data.heat,
        data.toppings,
        data.photo
      );

      state.items.push(newItem);
      return newItem;
    },
    removeItem: (id) => {
      let index = state.items.findIndex((element) => element.id === id);

      state.items.splice(index, 1);
    },

    sortByName: () => {
      state.items = state.items.sort((a, b) => a.name.localeCompare(b.name));
      return state.items;
    },

    sortByPrice: () => {
      state.items = state.items.sort((a, b) => a.price - b.price);
      return state.items;
    },

    sortByHeat: () => {
      state.items = state.items.sort((a, b) => b.heat - a.heat);
      return state.items;
    },
  };
})();
