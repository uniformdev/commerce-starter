import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useCartContext } from '@/context/CartProvider';

interface Props {
  cartUrl: string;
}

const ShoppingCartIcon: FC<Props> = ({ cartUrl }) => {
  const { totalCartItemsCount } = useCartContext();

  return (
    <Link
      aria-label="header-cart"
      className={classNames('flex items-center cursor-pointer justify-end', {
        'justify-between': Boolean(totalCartItemsCount),
      })}
      href={cartUrl}
    >
      {Boolean(totalCartItemsCount) && (
        <div className="full pr-1.5 navbar-item font-extrabold">{totalCartItemsCount}</div>
      )}
      <Image
        src="https://res.cloudinary.com/uniformdev/image/upload/v1675775007/vNext%20Demos/icons/icon-cart_zzou3e.svg"
        width={24}
        height={24}
        alt="cart icon"
        unoptimized
      />
    </Link>
  );
};

export default ShoppingCartIcon;
