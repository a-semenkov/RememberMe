import React from 'react';
import { AnimatePresence } from 'framer-motion';
import useToggle from '../../hooks/useToggle';
import styles from './dropdown.module.css';
// TODO: Оптимизировать компонент

interface IDropdownProps {
  triggerElement: React.ReactNode;
  children: React.ReactNode;
  cls?: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

function Dropdown({
  triggerElement,
  children,
  cls,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  const [isDropdownOpen, toggleDropdown] = useToggle();

  React.useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen]
  );

  return (
    <div className={cls} onClick={() => toggleDropdown()}>
      {triggerElement}
      <AnimatePresence>
        {isDropdownOpen && (
          <>
            <div className={styles.backdrop} />
            {children}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
