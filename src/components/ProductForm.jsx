import React, { useState } from "react";

import styles from "../components/styles_modules/ProductForm.module.css";

import { useCreateProductMutation } from "../api/productsApi";

function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  //RTK Query: хук для создания нового продукта
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !imageUrl) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      image: imageUrl,
    };

    try {
      /*const res = await fetch("https://67fbd1781f8b41c81684f5de.mockapi.io/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      */

       //Отправляем запрос на создание нового продукта
      await createProduct(newProduct).unwrap();  
      onAdd(data);
      setName("");
      setPrice("");
      setImageUrl("");
      setError("");
    } catch (err) {
      setError("Ошибка при добавлении товара.");
    }
  };

  return (

    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3 className={styles.formTitle}>Добавить товар</h3>

      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.formInput}
      />

      <input
        type="text"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={styles.formInput}
      />

      <input
        type="text"
        placeholder="Ссылка на изображение"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className={styles.formInput}
      />

      {error && <p className={styles.formError}>{error}</p>}

      <button type="submit" className={styles.formButton}>Добавить</button>
    </form>
  );
}

export default ProductForm;
