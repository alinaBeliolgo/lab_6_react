import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/slice";

import styles from './styles_modules/PizzaCard.module.css';

function PizzaCard({ pizza }) {
  const [selectedSize, setSelectedSize] = useState(pizza.sizes[0]);
  //используем useDispatch для отправки экшенов в Redux store
  const dispatch = useDispatch();

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  //функция для добавления пиццы в корзину
  const handleAddToCart = () => {
    dispatch(addToCart({ id: pizza.id, name: pizza.name, price: pizza.price, size: selectedSize }));
  };

  return (
    <div className={styles.card}>
      <img src={pizza.image} alt={pizza.name} />
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price} лей.</p>
      <div>
        {pizza.sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : ""}`}
          >
            {size} см.
          </button>
        ))}
      </div>
      <button className={styles.addToCartButton} onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
}

export default PizzaCard;