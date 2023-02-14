import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from './components/Form';
import { IRegisterForm } from './form.interface';
import Input from './components/Input';
import EMAIL_VALIDATION_PATTERN from './constants';
import { useCreateUserMutation } from '../api/apiSlice';

function RegisterForm() {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterForm>();

  const [createUser] = useCreateUserMutation();

  const onSubmit: SubmitHandler<IRegisterForm> = async () => {
    const { email, password } = getValues();
    await createUser({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Регистрация нового пользователя</h1>
      <Input<IRegisterForm>
        placeholder='Введите e-mail'
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
      <Input<IRegisterForm>
        // className={styles.input}
        placeholder='Введите ваш пароль'
        type='password'
        name='password'
        autoComplete='new-password'
        register={register}
        rules={{
          required: 'Поле пароль не может быть пустым',
        }}
      />
      {errors.password && <div>{errors.password.message}</div>}
      <Input<IRegisterForm>
        // className={styles.input}
        placeholder='Подтвердите пароль'
        type='password'
        name='confirmPassword'
        autoComplete='new-password'
        register={register}
        rules={{
          required: true,

          validate: (val: string) =>
            val === watch('password') || 'Пароли не совпадают',
        }}
      />
      {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}

      <input className={`btn_primary `} type='submit' disabled={isSubmitting} />
    </Form>
  );
}

export default RegisterForm;
