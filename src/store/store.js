import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart/slice';

import { productsApi } from '../api/productsApi';


// Функция для загрузки состояния корзины из localStorage
const loadState = () => {
    try {
      // Получаем состояние корзины из localStorage
      const serializedState = localStorage.getItem('cart');
      return serializedState ? JSON.parse(serializedState) : undefined; // Если состояние не найдено, возвращаем undefined
    } catch (e) {
      console.error('Не удалось загрузить состояние из localStorage:', e);
      return undefined;
    }
  };

// Функция для сохранения состояния корзины в localStorage
const saveState = (state) => {
    try {
      // Сериализуем состояние корзины и сохраняем его в localStorage
      const serializedState = JSON.stringify(state.cart);
      // Сохраняем только состояние корзины, чтобы не перезаписывать другие состояния
      localStorage.setItem('cart', serializedState);
    } catch (e) {
      console.error('Не удалось сохранить состояние в localStorage:', e);
    }
  };

  // Начальное состояние корзины 
const preloadedState = {
  cart: loadState() || {
    items: [],
    totalQuantity: 0,
  },
};

// Создаем Redux store с использованием configureStore
export const store = configureStore({
 reducer: {
   cart: cartReducer,
    // Добавляем редюсер для RTK QUERY API
    [productsApi.reducerPath]: productsApi.reducer,
 },
  middleware: (getDefaultMiddleware) =>
    // Добавляем middleware для RTK QUERY API
    getDefaultMiddleware().concat(productsApi.middleware),
 preloadedState,
});

//Подписка на изменения состояния Store
store.subscribe(() => {
    saveState(store.getState());
  });