// Селектор для получения состояния корзины
export const selectCart = (state) => state.cart;

// Селектор для получения количества товаров в корзине
export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Селектор для получения общего количества товаров в корзине
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);