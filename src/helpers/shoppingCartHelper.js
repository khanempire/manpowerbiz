export const addToCart = (
  cartItems,
  item,
  setCartItems,
  refresh,
  setRefresh
) => {
  const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);

  // Define the maximum quantity allowed for each item
  const maxQuantity = 3;

  if (existingItem) {
    // If the item already exists in the cart and its quantity hasn't reached the limit
    if (existingItem.quantity < maxQuantity) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            price: cartItem.price + item.packagePrice,
          };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      console.log("Item already reached the maximum quantity limit.");
    }
  } else {
    // If the item does not exist in the cart, add it as a new item
    const newItem = {
      ...item,
      quantity: 1,
      price: item.packagePrice,
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
  }

  // Refresh the component to update the cart UI
  setRefresh(!refresh);
};

export const removeFromCart = (
  cartItems,
  item,
  setCartItems,
  refresh,
  setRefresh
) => {
  const updatedCartItems = cartItems.map((cartItem) => {
    if (cartItem._id === item._id) {
      // Reduce the quantity and price of the item
      const updatedCartItem = {
        ...cartItem,
        quantity: cartItem.quantity - 1,
        price: cartItem.price - item.packagePrice,
      };

      // Refresh the component to update the cart UI
      setRefresh(!refresh);

      return updatedCartItem;
    }

    return cartItem;
  });

  // Remove items with quantity <= 0 from the cart
  const filteredCartItems = updatedCartItems.filter(
    (cartItem) => cartItem.quantity > 0
  );

  setCartItems(filteredCartItems);
};

export const handleQuantityChange = (event, cartItems, item, setCartItems) => {
  const newQuantity = parseInt(event, 10);
  if (newQuantity >= 0 && newQuantity <= 3) {
    if (newQuantity === 0) {
      // If the new quantity is 0, remove the item from the cart
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: newQuantity,
            price: item.packagePrice * newQuantity,
          };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    }
  }
};
