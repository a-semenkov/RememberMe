export interface IUser {
  id: string;
  email: string | null;
  avatar?: string | null;
}

export interface IApiError {
  reason: string;
}

export interface ICredentials {
  email: string;
  password: string;
}
