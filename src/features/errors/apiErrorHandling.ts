import { toast } from 'react-toastify';
import { SerializedError } from '@reduxjs/toolkit';

import FIREBASE_AUTH_ERROR_CODES from './firebaseErrorCodes';
import { IApiError } from '../api/types';

interface IFirebaseError {
  message: string;
  code: string;
}

interface ICommonError {
  message: string;
}

export function isApiError(
  error: IApiError | SerializedError
): error is IApiError {
  return typeof error === 'object' && error != null && 'reason' in error;
}

export function isFirebaseError(error: unknown): error is IFirebaseError {
  return (
    typeof error === 'object' &&
    error != null &&
    'code' in error &&
    'message' in error &&
    (error as any) instanceof Error
  );
}

function isCommonError(error: unknown): error is ICommonError {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    (error as any) instanceof Error
  );
}

export function transformFirebaseMessage(error: string): string {
  if (error in FIREBASE_AUTH_ERROR_CODES) {
    const keyTyped = error as keyof typeof FIREBASE_AUTH_ERROR_CODES;
    return FIREBASE_AUTH_ERROR_CODES[keyTyped];
  }
  return error;
}

export function handleApiError(error: unknown): { error: IApiError } {
  if (typeof error === 'string') {
    toast.error(error);
    return { error: { reason: error } };
  }
  if (isFirebaseError(error)) {
    const handledErrorMsg = transformFirebaseMessage(error.code);
    toast.error(handledErrorMsg);
    return { error: { reason: handledErrorMsg } };
  }
  if (isCommonError(error)) {
    toast.error(error.message);
    return {
      error: { reason: error.message },
    };
  }

  toast.error('Непредвиденная ошибка');
  return {
    error: { reason: 'Непредвиденная ошибка' },
  };
}
