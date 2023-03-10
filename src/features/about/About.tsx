import React from 'react';
import styles from './about.module.css';

function About() {
  return (
    <div className={styles.about_wrapper}>
      <h2>Добро пожаловать на проект RememberMe!</h2>
      <p>
        Цель проекта - сохранить воспоминания о каждом дне человека, в виде
        дневника, чтобы запомнить ключевые события, ставить цели, формировать
        привычки с ежедневным контролем, выводы
      </p>
      <p>
        В данный момент проект существует в виде прототипа, с базовым
        функционалом и дизайном. По мере развития планируется добавление новых
        функций, дизайна и оптимизация.
      </p>
      <p>Планируемый функционал:</p>
      <ol>
        <li>
          Добавление фотографий, коротких подписей и общего впечатления каждый
          день (реализовано)
        </li>
        <li>
          Постановка целей (например, фотография каждый день на протяжении
          выбранного периода), контроль прогресса хобби или формирование
          привычек. В том числе, контроль отказа от вредных привычек
        </li>
        <li>
          Ретроспектива – возможность посмотреть, что было год назад или любой
          произвольный период. В том числе, возможность оценить результат
          похудения, изменения внешнего вида, оценка результата обучения игры на
          муз. инструментах и т.д.
        </li>
        <li>
          Базовый принцип приложения – воспоминания нельзя менять, то есть
          однажды создав запись в календаре, нельзя изменить фотографию или
          подпись.
        </li>
        <li>
          Возможность поделиться результатами с другими людьми (например,
          результат похудения) в виде слайдшоу загруженных фотографий, либо фото
          до/после.
        </li>
      </ol>
      <p>Технический план реализации проекта:</p>
      <ol>
        <li>
          Планируется полноценное мобильное приложение. По смыслу проекта –
          мобильное приложение будет основным, а web-приложение –
          второстепенным.
        </li>
        <li>
          Добавление фильтров и кропа фотографии, возможность загружать видео
        </li>
        <li>
          Возможность использовать несколько календарей и переключаться между
          ними: для текущих целей (формирования привычек) и ежедневное фото
        </li>
        <li>Разработка дизайна, анимаций и т.д.</li>
        <li>
          Социальная часть – возможность делиться результатами, чат, лайки, и
          т.д.
        </li>
      </ol>
    </div>
  );
}

export default About;
