import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import useToggle from '../../hooks/useToggle';

import styles from './auth.module.css';

export default function Auth() {
  const [isLogin, toggleIsLogin] = useToggle();

  return (
    <div className={styles.auth_wrapper}>
      <AnimatePresence initial={false} mode='wait'>
        {isLogin ? (
          <motion.div
            key='register'
            initial={{ x: '150%' }}
            animate={{ x: 0 }}
            exit={{ x: '-150%' }}
            transition={{ x: { duration: 0.25, type: 'spring', bounce: 0.3 } }}
          >
            <RegisterForm />
            <div>
              Уже зарегистрированы?
              <button
                type='button'
                className={styles.link}
                onClick={() => toggleIsLogin()}
              >
                Войдите
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key='login'
            initial={{ x: '150%' }}
            animate={{ x: 0 }}
            exit={{ x: '-150%' }}
            transition={{ x: { duration: 0.25, type: 'spring', bounce: 0.3 } }}
          >
            <AuthForm />
            <div>
              Нет Аккаунта?
              <button
                type='button'
                className={styles.link}
                onClick={() => toggleIsLogin()}
              >
                Зарегистрируйтесь
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
