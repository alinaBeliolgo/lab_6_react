import React, { useState, useEffect } from "react";

//import pizzaData from "../data/pizza.json";
import PizzaCard from "../components/PizzaCard";
import Search from "./Search.jsx";
import styles from './styles_modules/PizzaList.module.css';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductForm from "./ProductForm";

import { useGetProductsQuery } from "../api/productsApi";



//const API_URL = "https://67fbd1781f8b41c81684f5de.mockapi.io/api/v1/products";

function PizzaList() {
  //используем RTK Query для получения данных
  const { data: pizzas = [], isLoading, isError } = useGetProductsQuery(); // Используем RTK Query
  //это состояние для хранения пицц
  const [filteredPizzas, setFilteredPizzas] = useState([]);

  // Обновляем отфильтрованные пиццы при изменении данных
  useEffect(() => {
    setFilteredPizzas(pizzas);
  }, [pizzas]);


  //функция для обработки поиска
  const handleSearch = (query) => {
    const filtered = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPizzas(filtered);
  };


  //если данные загружаются, показываем скелетон
  if (isLoading) {
    return (
      <div className={styles.pizzaList}>
        {Array(6).fill().map((_, index) => (
          <div key={index}>
            <Skeleton height={200} />
            <Skeleton count={2} />
          </div>
        ))}
      </div>
    );
  }
  
  //показываем сообщение об ошибке загрузки данных
  if (isError) {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <>
      <ProductForm />
      <h2 className={styles.title}>Пиццы</h2>
      <Search onSearch={handleSearch} />
      <div className={styles.pizzaList}>
        {filteredPizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </>
  );
}

export default PizzaList;