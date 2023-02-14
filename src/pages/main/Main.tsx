import React from 'react';
import MainPageTopBanner from '../../features/banners/MainPageTopBanner';
import styles from './main.module.css';

import { ReactComponent as CreateEntry } from '../../assets/svg/photoStack.svg';
import { ReactComponent as About } from '../../assets/svg/about.svg';
import formatDate from '../../utils/formatDate';

function Main() {
  const today = formatDate(new Date());

  return (
    <div className={styles.wrapper}>
      <MainPageTopBanner
        icon={<CreateEntry />}
        caption='Выберите день в календаре и сохраните ваши воспоминания!'
        link={`/photo/${today}`}
      />
      <MainPageTopBanner
        icon={<About />}
        caption='О проекте RememberMe'
        link='/about'
      />
    </div>
  );
}

export default Main;
