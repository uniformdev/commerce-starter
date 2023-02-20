import { FC } from 'react';
import ProductItem from './ProductItem';
import ProductLoadingSkeleton from './ProductLoadingSkeleton';
import InformationContent from './InformationContent';

interface Props {
  isLoading: boolean;
  products: Type.Product[];
  searchValue: string;
}

const SearchResult: FC<Props> = ({ searchValue, products, isLoading }) => {
  if (isLoading) return <ProductLoadingSkeleton />;

  if (!products?.length) {
    return <InformationContent title="Sorry there are no products for this filter" />;
  }

  return (
    <>
      <div className="flex flex-1 justify-between z-50">
        <div className="flex z-50">
          <div className="flex mt-2 mb-4 font-extrabold">
            {searchValue &&
              `Your results for “${searchValue.length > 50 ? `${searchValue.substring(0, 50)}...` : searchValue}”`}
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 justify-center items-center gap-6">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SearchResult;
