import { GetStaticProps, GetStaticPaths } from 'next';
import { getFakeCommerceEnhancers } from '@/enhancers/commerce';
import { CommonContainer } from '@/components-library';
import { getCompositionBySlug, getPathsFromProjectMap } from '@/utilities/canvas';
import { InternalCompositionSlugs, ProductPagesPrefixes } from '@/constants';
import categories from '@/data/categories.json';
import productsHashCache from '@/data/products.json';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { category: queryCategory } = params || {};

  const category = String(queryCategory);

  return getCompositionBySlug(
    `${InternalCompositionSlugs.ProductListingPrefix}/${category}`,
    context,
    getFakeCommerceEnhancers(productsHashCache, { category, categories })
  )
    .then(composition => ({
      props: {
        composition,
        key: category,
        preview: Boolean(preview),
        revalidate: Number.MAX_SAFE_INTEGER,
      },
    }))
    .catch(() => ({ notFound: true }));
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPathsFromProjectMap({ path: ProductPagesPrefixes.ProductListPage });
  return { paths, fallback: false };
};

export default CommonContainer;
