import React from 'react';
import styles from './form.module.css';

interface IForm {
  onSubmit: () => void;
  children: React.ReactNode;
}

function Form({ onSubmit, children }: IForm) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
