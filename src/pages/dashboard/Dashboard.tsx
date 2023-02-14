import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Entry from '../entry/Entry';
import Calendar from '../../features/calendar/Calendar';
import Logo from '../../features/logo/Logo';
import Menu from '../../features/menu/Menu';

import styles from './dashboard.module.css';
import UnderConstruction from '../../features/underConstruction/UnderConstruction';
import Main from '../main/Main';
import About from '../../features/about/About';
import NotFound from '../../features/notFound/NotFound';

function Dashboard() {
  return (
    <main className={styles.app}>
      <nav className={styles.left}>
        <Logo />
        <Menu />
      </nav>
      <section className={styles.main}>
        <Routes>
          <Route path='/' index element={<Main />} />
          <Route path='/about' index element={<About />} />
          <Route path='under-construction/' element={<UnderConstruction />} />
          <Route path='photo/:date' element={<Entry />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </section>
      <aside className={styles.right}>
        <Calendar />
      </aside>
    </main>
  );
}

export default Dashboard;
