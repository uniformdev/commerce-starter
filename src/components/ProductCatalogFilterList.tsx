import { FC, useCallback } from 'react';

export interface Item {
  id: string;
  name: string;
  url: string;
}

interface Props {
  title: string;
  list: Item[];
  activeItem: Item;
  onClick: (url: string) => void;
  className?: string;
}

const ProductCatalogFilterList: FC<Props> = ({ title, list, activeItem, onClick, className = '' }) => {
  const getOnClickHandler = useCallback((item: Item) => () => onClick(item.url), [onClick]);

  return (
    <div className={className}>
      <p className="font-extrabold text-lg ml-3">{title}</p>
      {Boolean(list.length) && (
        <ul>
          {list.map(item => (
            <li key={item.id} className="mt-4">
              <button
                className={`rounded px-3 py-1.5 whitespace-nowrap hover:opacity-30 ${
                  item.id === activeItem?.id ? 'text-white bg-black' : 'text-black bg-white'
                }`}
                onClick={getOnClickHandler(item)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductCatalogFilterList;
