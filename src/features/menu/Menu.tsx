import React from 'react';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import styles from './menu.module.css';
import icons from './icons.svg';

function Menu() {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <ul className={styles.menu}>
      <li className={styles.item}>
        <Link to='/'>
          <svg className={styles.icon}>
            <use xlinkHref={`${icons}#icon-dashboard`} />
          </svg>
          Главная
        </Link>
      </li>
      <li className={styles.item}>
        <Link to='under-construction/'>
          <svg className={styles.icon}>
            <use xlinkHref={`${icons}#icon-goals`} />
          </svg>
          Цели
        </Link>
      </li>
      <li className={styles.item}>
        <Link to='under-construction/'>
          <svg className={styles.icon}>
            <use xlinkHref={`${icons}#icon-stories`} />
          </svg>
          Истории
        </Link>
      </li>
      <li className={styles.item}>
        <Link to='under-construction/'>
          <svg className={styles.icon}>
            <use xlinkHref={`${icons}#icon-settings`} />
          </svg>
          Настройки
        </Link>
      </li>
      <li className={styles.item} onClick={logout}>
        <svg className={styles.icon}>
          <use xlinkHref={`${icons}#icon-logout`} />
        </svg>
        Выйти
      </li>
    </ul>
  );
}

export default Menu;
