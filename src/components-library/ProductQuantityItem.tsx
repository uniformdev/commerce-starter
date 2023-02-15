import { FC } from 'react';
import Image from 'next/image';

interface Props {
  quantity: number;
  onClickIncrement: () => void;
  onClickDecrement: () => void;
}

const ProductQuantityItem: FC<Props> = ({ quantity, onClickIncrement, onClickDecrement }) => (
  <div className="flex justify-between flex-row lg:w-48 w-40 max-h-12 border border-gray-100">
    <button
      type="button"
      disabled={quantity === 1}
      className="border-r border-gray-100 p-3.5 hover:bg-gray-100 duration-300 lg:w-1/4 w-1/3 disabled:opacity-30"
      onClick={onClickDecrement}
    >
      <Image
        width={18}
        height={18}
        src="https://res.cloudinary.com/uniformdev/image/upload/v1675622825/vNext%20Demos/icons/icon-minus_rl6auo.svg"
        alt="icon minus"
        unoptimized
      />
    </button>
    <div className="border-gray-100 lg:w-1/2 w-1/3 text-center my-auto font-bold">{quantity}</div>
    <button
      type="button"
      className="border-l border-gray-100 hover:bg-gray-100 duration-300 p-3.5 lg:w-1/4 w-1/3"
      onClick={onClickIncrement}
    >
      <Image
        width={18}
        height={18}
        src="https://res.cloudinary.com/uniformdev/image/upload/v1675622526/vNext%20Demos/icons/icon-plus_pcl73l.svg"
        alt="icon plus"
        unoptimized
      />
    </button>
  </div>
);

export default ProductQuantityItem;
