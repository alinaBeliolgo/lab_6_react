import styles from '../components/styles_modules/Header.module.css';

import React from "react";

import { useSelector } from "react-redux";

import { selectCartItemsCount } from "../store/cart/actions";

import { Link } from "react-router-dom";


function Header() {
  const totalQuantity = useSelector(selectCartItemsCount);

  return (
    <header className={styles.header}>
      <h1>Пиццерия</h1>
      <nav>
      <Link to="/">Меню</Link> | <Link to="/about">О нас</Link> | <Link to="/cart">Корзина ({totalQuantity})</Link>
      </nav>
    </header>
  );
}

export default Header;