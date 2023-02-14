import { nanoid } from '@reduxjs/toolkit';
import { assoc } from 'ramda';

export function generateRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

export function assignRandomId<O extends Object>(obj: O) {
  return assoc('id', nanoid(), obj);
}

export function createListObject<T>(item: T) {
  return assignRandomId({ value: item });
}
