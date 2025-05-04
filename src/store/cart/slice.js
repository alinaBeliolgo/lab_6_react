import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 items: [],
 totalQuantity: 0,
};

const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
    addToCart(state, action) {
    // логика добавления товара
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Если товар уже есть в корзине, увеличиваем его количество
        existingItem.quantity += action.payload.quantity;
      } else {
        // Если товара нет в корзине, добавляем его
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      // Увеличиваем общее количество товаров в корзине
      state.totalQuantity += action.payload.quantity || 1;
    },


    removeFromCart(state, action) {
    // логика удаления по id
      // Находим индекс товара в корзине по его id
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        // Уменьшаем общее количество товаров
        state.totalQuantity -= state.items[itemIndex].quantity;
        // Удаляем из корзины
        state.items.splice(itemIndex, 1);
      }
      //
    },


    updateQuantity(state, action) {
    // логика изменения количества товара
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        // Обновляем общее количество товаров
        state.totalQuantity += quantity - item.quantity;
        // Устанавливаем новое количество для товара
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;