import { GetStaticProps, GetStaticPaths } from 'next';
import { getFakeCommerceEnhancers } from '@/enhancers/commerce';
import { CommonContainer } from '@/components';
import { getCompositionBySlug, getPathsFromProjectMap } from '@/utilities/canvas';
import { getAvailableSubCategoriesPaths } from '@/utilities/products';
import { InternalCompositionSlugs, ProductPagesPrefixes } from '@/constants';
import categories from '@/data/categories.json';
import productsHashCache from '@/data/products.json';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { category: queryCategory, subcategory: querySubCategory } = params || {};

  const category = String(queryCategory);
  const subCategory = String(querySubCategory);

  return getCompositionBySlug(
    `${InternalCompositionSlugs.ProductListingPrefix}/${category}`,
    context,
    getFakeCommerceEnhancers(productsHashCache, {
      category,
      categories,
      subCategory,
    })
  )
    .then(composition => ({
      props: {
        composition,
        preview: Boolean(preview),
        key: `${category}-${subCategory}`,
        revalidate: Number.MAX_SAFE_INTEGER,
      },
    }))
    .catch(() => ({ notFound: true }));
};

export const getStaticPaths: GetStaticPaths = async () => {
  const baseCategoriesPaths = await getPathsFromProjectMap({
    path: ProductPagesPrefixes.ProductListPage,
  });
  const paths = getAvailableSubCategoriesPaths(baseCategoriesPaths, categories);
  return { paths, fallback: false };
};

export default CommonContainer;
