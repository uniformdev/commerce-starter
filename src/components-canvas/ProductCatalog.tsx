import { FC, ChangeEvent, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import debounce from 'lodash.debounce';
import { buildSubCategoryUrl, getProductSearchResult } from '@/utilities/products';
import Container, { PaddingSize } from '@/components-library/Container';
import Dropdown from '@/components-library/Dropdown';
import ProductCatalogFilterList from '@/components-library/ProductCatalogFilterList';
import ProductCatalogSearchResult from '@/components-library/ProductCatalogSearchResult';

const SortOptions = [
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
];

const DefaultSortOption = { label: 'Sort By', value: undefined };
const DefaultSortField = 'price';

type Props = ComponentProps<{
  categories: Type.Category[];
  prefetchedSearchResult: Type.Product[];
  activeCategory: Type.Category;
  title?: string;
}>;

const ProductCatalog: FC<Props> = ({ categories, activeCategory, prefetchedSearchResult, title = '' }) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [sortDirection, setSortDirection] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Type.Product[]>(prefetchedSearchResult);

  const getProducts = useCallback(
    (searchParams: Type.SearchParams) => {
      setIsLoading(true);
      const { data } = getProductSearchResult(prefetchedSearchResult, searchParams);
      setProducts(data);
      setIsLoading(false);
    },
    [prefetchedSearchResult]
  );

  const getProductsDebounce = useMemo(() => debounce(getProducts, 700), [getProducts]);

  const triggerSearch = useCallback(
    (changedField: string, newValue: unknown) => {
      const dynamicSearchParams = {
        keyword,
        sortDirection,
        [changedField]: newValue,
      };

      getProductsDebounce({
        categoryId: activeCategory?.id,
        sortField: dynamicSearchParams.sortDirection ? DefaultSortField : undefined,
        keyword: dynamicSearchParams.keyword,
        sortDirection: dynamicSearchParams.sortDirection,
      });
    },
    [keyword, sortDirection, activeCategory?.id, getProductsDebounce]
  );

  // This function  handles the click on the sub-category, if the sub-category is already selected it will remove the it from the url
  const onSubCategoryClick = useCallback(
    (subCategoryUrl: string) => {
      const { category: queryCategory, subcategory: querySubCategory } = router.query || {};

      const category = String(queryCategory);
      const subCategory = String(querySubCategory);

      let urlToRedirect = buildSubCategoryUrl(category, subCategoryUrl);

      if (subCategory === subCategoryUrl) {
        urlToRedirect = buildSubCategoryUrl(category, '');
      }

      router.push(urlToRedirect, undefined, { scroll: false });
    },
    [router]
  );

  const handleSearchKeywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchKeyword = e.target.value;
      setKeyword(searchKeyword);
      triggerSearch('keyword', searchKeyword);
    },
    [triggerSearch, setKeyword]
  );

  const handleSortChange = useCallback(
    (value?: string) => {
      setSortDirection(value);
      triggerSearch('sortDirection', value);
    },
    [triggerSearch, setSortDirection]
  );

  if (!categories || !activeCategory || !prefetchedSearchResult) return null;

  return (
    <Container paddingBottom={PaddingSize.None}>
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <p className="text-2xl lg:text-3xl font-bold mb-4 pl-3 sm:mb-0 min-w-[18%]">{title}</p>
        <div className="flex flex-1 flex-col items-center md:flex-row justify-between">
          <div className="lg:w-[70%] w-full flex justify-start md:pl-2 pb-8 md:pb-0">
            <div className="relative bg-gray-50 flex lg:ml-4 w-full md:w-[70%] h-[50px] direction-row border-gray-300 index-1">
              <input
                type="text"
                value={keyword}
                onChange={handleSearchKeywordChange}
                placeholder="Search by keyword or product"
                className="w-[90%] h-full block px-3 py-2 bg-gray-50 border-none outline-none placeholder:text-black"
              />
              <div className="absolute top-4 right-3">
                <Image
                  width={20}
                  height={20}
                  src="https://res.cloudinary.com/uniformdev/image/upload/v1675765515/vNext%20Demos/icons/icon-search_ckbind.svg"
                  alt="icon minus"
                  unoptimized
                />
              </div>
            </div>
          </div>
          <div className="min-w-[193px]">
            <Dropdown
              title="Sort By"
              defaultOption={DefaultSortOption}
              options={SortOptions}
              value={sortDirection as string}
              onChange={handleSortChange}
            />
          </div>
        </div>
      </div>
      <div className="sm:pt-12 pt-10 flex flex-col pb-24 lg:flex-row">
        <div className="xl:pr-16 xl:mr-3 flex flex-row lg:flex-col justify-evenly lg:justify-start lg:w-1/5">
          <ProductCatalogFilterList
            title="Categories"
            list={categories}
            activeItem={activeCategory}
            onClick={onSubCategoryClick}
          />
        </div>
        <div className="flex flex-row flex-wrap w-full lg:w-4/5">
          <div className="lg:flex flex-row flex-wrap lg:justify-start justify-center z-0 w-full">
            <ProductCatalogSearchResult isLoading={isLoading} products={products} searchValue={keyword} />
          </div>
        </div>
      </div>
    </Container>
  );
};

registerUniformComponent({
  type: 'productCatalog',
  component: ProductCatalog,
});

export default ProductCatalog;
