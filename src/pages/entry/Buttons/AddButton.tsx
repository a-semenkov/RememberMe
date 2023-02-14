import React, { ReactNode } from 'react';

import styles from './addButton.module.css';

interface IAddButton {
  caption: string;
  icon: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement, MouseEvent>) => void;
}

const AddButton = React.forwardRef(
  (
    { caption, icon, onClick = () => {} }: IAddButton,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => (
    <button ref={ref} className={styles.button} type='button' onClick={onClick}>
      <div className={styles.icon}>{icon}</div>

      <p className={styles.caption}>{caption}</p>
    </button>
  )
);

export default AddButton;
