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
    // return newItem Obj
    addItem: (data) => {
      const id = new Date().getTime();

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

    // remove item from state
    removeItem: (id) => {
      let index = state.items.findIndex((element) => element.id === id);

      state.items.splice(index, 1);
    },

    getState() {
      return state.items;
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
