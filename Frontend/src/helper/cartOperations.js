//Takes cart items
//Calculates cartQuantity and cartAmount
//Saves all 3 in localstorage
//returns all 3 as obj

const cartOperations = (cartItems) => {
  let cartQuantity = 0;
  let cartAmount = 0;

  cartItems.forEach((item) => {
    cartQuantity += item.quantity;
    cartAmount += item.quantity * item.price;
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
  localStorage.setItem("cartAmount", JSON.stringify(cartAmount));

  const cartObj = {
    cartItems,
    cartQuantity,
    cartAmount,
  };

  return cartObj;
};

module.exports = cartOperations;
