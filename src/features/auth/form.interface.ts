export interface IAuthForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends IAuthForm {
  confirmPassword: string;
}
