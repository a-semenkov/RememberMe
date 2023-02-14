import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthForm } from './form.interface';
import { useAuthMutation, useAuthWithGoogleMutation } from '../api/apiSlice';
import EMAIL_VALIDATION_PATTERN from './constants';
import Form from './components/Form';
import Input from './components/Input';

import { useCreateDbUserMutation, useLazyGetUserIdQuery } from '../api/dbSlice';

import googleSvg from './assets/google.svg';
import styles from './authForm.module.css';

function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthForm>();

  const [auth] = useAuthMutation();
  const [authWithGoogle] = useAuthWithGoogleMutation();
  const [getUserId] = useLazyGetUserIdQuery();
  const [createUser] = useCreateDbUserMutation();

  const onSubmit: SubmitHandler<IAuthForm> = async ({ email, password }) => {
    await auth({ email, password }).unwrap();
  };

  const handleGoogleLoginClick = async () => {
    const user = await authWithGoogle().unwrap();

    const { isUser } = await getUserId({ uid: user.id }).unwrap();

    if (isUser) return;

    await createUser({
      uid: user.id,
      email: user.email,
      avatar: user.avatar,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.header}>С возвращением!</h1>
      <Input<IAuthForm>
        placeholder='Введите ваш e-mail'
        type='email'
        name='email'
        autoComplete='email'
        register={register}
        rules={{
          required: 'Пожалуйста, заполните поле e-mail',
          pattern: {
            value: EMAIL_VALIDATION_PATTERN,
            message:
              'Пожалуйста, введите корректный адрес e-mail для авторизации',
          },
        }}
      />
      {errors.email && (
        <div className={styles.errors}>{errors.email.message}</div>
      )}
      <Input<IAuthForm>
        placeholder='Введите ваш пароль'
        type='password'
        name='password'
        autoComplete='current-password'
        register={register}
        rules={{
          required: 'Поле пароль не может быть пустым',
        }}
      />
      {errors.password && (
        <div className={styles.errors}>{errors.password.message}</div>
      )}
      <input
        className={`btn_primary ${styles.submit}`}
        type='submit'
        disabled={isSubmitting}
      />

      <div className={styles.login_methods}>
        <span className={styles.methods_header}> Или войдите с помощью</span>

        <svg className={styles.svg} onClick={handleGoogleLoginClick}>
          <use href={`${googleSvg}#google_logo`} />
        </svg>
      </div>
    </Form>
  );
}

export default AuthForm;
