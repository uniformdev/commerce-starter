import { ProductPagesPrefixes } from '@/constants';

const buildUrl = (urls: string[]) => {
  const url = urls.join('/');
  return url.startsWith('/') ? url : `/${url}`;
};

export const buildSubCategoryUrl = (firstParam: string, secondParam: string) =>
  buildUrl([ProductPagesPrefixes.ProductListPage, firstParam, secondParam]);

export const getProductSearchResult = (
  products: Type.Product[],
  params: Type.SearchParams
): {
  data: Type.Product[];
  total: number;
} => {
  let searchResult = products;
  const { categoryId, keyword, sortField, sortDirection, limit, page } = params;

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
    searchResult = searchResult.sort((a, b) =>
      sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
    );
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

export const getProductsByIds = (productsHashCache: Type.ProductsHashCache, ids: string[]) =>
  ids.map(id => productsHashCache[id]).filter(value => Boolean(value));

export const getProductIdByProductSlug = (slug: string) => {
  const [productId] = slug.split('-').reverse();
  if (!productId) throw new Error('Unable to find product id in slug');
  return productId;
};

export const getAvailableSubCategoriesPaths = (parentCategoriesPaths: string[], categories: Type.Category[]) => {
  return parentCategoriesPaths.reduce<string[]>((acc, parentCategoryPath) => {
    const currentCategory = categories.find(category => parentCategoryPath.includes(category.url));

    if (currentCategory) {
      const subCategories = categories.filter(subCategory => subCategory.parentId === currentCategory.id);

      const categoryWithSubCategory = subCategories.map(subCategory => buildUrl([parentCategoryPath, subCategory.url]));

      return [...acc, ...categoryWithSubCategory];
    }

    return acc;
  }, []);
};
