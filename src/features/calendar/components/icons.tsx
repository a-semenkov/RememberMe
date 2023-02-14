import React from 'react';
import icons from './icons.svg';

interface IIconProps {
  className: string;
}

export function NextIcon({ className }: IIconProps) {
  return (
    <svg className={className}>
      <use href={`${icons}#arrow-next`} />
    </svg>
  );
}

export function PrevIcon({ className }: IIconProps) {
  return (
    <svg className={className}>
      <use href={`${icons}#arrow-prev`} />
    </svg>
  );
}
