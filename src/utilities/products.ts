export const getProductSearchResult = (
  products: CommerceTypes.Product[],
  params: CommerceTypes.SearchParams
): {
  data: CommerceTypes.Product[];
  total: number;
} => {
  let searchResult = products;
  const { categoryId, keyword, sortField, sortDirection, limit, page = 1 } = params;

  if (categoryId) {
    searchResult = products.filter(item => item.categories.includes(categoryId));
  }

  if (keyword) {
    searchResult = searchResult.filter(item => {
      return item.name.toLowerCase().includes(keyword.toString().toLowerCase());
    });
  }

  const length = searchResult.length;

  if (sortField) {
    searchResult = searchResult.sort((a, b) => {
      const firstValue = a[sortField];
      const secondValue = b[sortField];
      if (typeof firstValue === 'string' && typeof secondValue === 'string') {
        return sortDirection === 'asc' ? firstValue.localeCompare(secondValue) : secondValue.localeCompare(firstValue);
      } else if (typeof firstValue === 'number' && typeof secondValue === 'number') {
        return sortDirection === 'asc' ? firstValue - secondValue : secondValue - firstValue;
      } else return 0;
    });
  }

  if (page && limit) {
    const parsedPage = Number(page) - 1;
    const parsedLimit = Number(limit);

    searchResult = searchResult.slice(parsedPage * parsedLimit, parsedPage * parsedLimit + parsedLimit);
  }

  return {
    data: searchResult,
    total: length,
  };
};

export const getProductsByIds = (productsHashCache: CommerceTypes.ProductsHashCache, ids: string[]) =>
  ids.map(id => productsHashCache[id]).filter(Boolean);

export const getProductsByField = (
  productsHashCache: CommerceTypes.ProductsHashCache,
  fieldName?: string,
  fieldValue?: string | string[]
) =>
  Object.values(productsHashCache).filter(
    product => fieldName && fieldValue && String(product[fieldName as keyof CommerceTypes.Product]) === fieldValue
  );
