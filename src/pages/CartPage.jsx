import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, updateQuantity } from "../store/cart/slice.js";

import { selectCart } from "../store/cart/actions.js";

import styles from "../components/styles_modules/CartPage.module.css";

function CartPage() {
  // Получаем список товаров из состояния корзины
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();

  // Удаление товара из корзины
  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  // Изменение количества товара в корзине
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Корзина: список выбранных блюд</h2>
      {items.length === 0 ? (
        // Если корзина пуста, отображаем сообщение
        <p className={styles.emptyCart}>Корзина пуста</p>
      ) : (
        // Если в корзине есть товары, отображаем их
        <ul className={styles.cartList}>
          {items.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div>
                <h3>{item.name}</h3>
                <p>Цена: {item.price} лей</p>
                <p>Размер: {item.size} см</p>
                <p>
                  Количество:{" "}
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </p>
              </div>
              <button onClick={() => handleRemove(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;