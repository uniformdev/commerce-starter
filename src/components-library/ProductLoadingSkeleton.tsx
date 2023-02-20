import { FC } from 'react';

interface Props {
  items?: number;
}

const ProductLoadingSkeleton: FC<Props> = ({ items = 6 }) => (
  <div className="grid w-full grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 justify-center items-center gap-6">
    {[...new Array(items).keys()].map(key => (
      <div key={`skeleton-element-${key}`} className="group flex flex-1 flex-col w-full mx-auto mb-auto mt-0">
        <div className="relative flex flex-col items-center lg:px-0">
          <div className="flex flex-col cursor-pointer w-full">
            <div className="animate-pulse relative p-[0px] lg:-m-[2px] w-full h-auto border-[18px]  transition-all border-white outline-1 outline outline-gray-100">
              <div className="bg-gray-300 w-[242px] h-[242px] mx-auto" />
            </div>
            <div className="animate-pulse mt-6  overflow-hidden text-ellipsis">
              <div className="bg-gray-300 min-h-[15px] rounded-xl" />
            </div>
            <div className="h-14 pt-1">
              <div className="bg-gray-300 min-h-[12px] rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProductLoadingSkeleton;
