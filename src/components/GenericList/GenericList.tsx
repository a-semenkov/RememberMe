import React, { ComponentProps, ElementType } from 'react';

interface IListProps {
  value: React.ReactNode;
  id: string;
}

interface IListOwnProps<E extends ElementType = ElementType> {
  list: Array<IListProps>;
  // eslint-disable-next-line no-unused-vars
  onClick?: (id: string) => void;
  As?: E;
}

type IListGenericProps<E extends ElementType> = IListOwnProps<E> &
  Omit<ComponentProps<E>, keyof IListOwnProps>;

const NOOP = () => {};

function GenericList<E extends ElementType = 'div'>({
  list,
  As,

  onClick = NOOP,
  ...other
}: IListGenericProps<E>) {
  const TagName = As || 'div';

  return (
    <>
      {list.map((item) => (
        <TagName key={item.id} onClick={() => onClick(item.id)} {...other}>
          {item.value}
        </TagName>
      ))}
    </>
  );
}

export default GenericList;
