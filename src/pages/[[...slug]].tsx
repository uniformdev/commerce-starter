import { GetStaticProps, GetStaticPaths } from 'next';
import { getFakeCommerceEnhancers } from '@/enhancers/commerce';
import { CommonContainer } from '@/components-library';
import { getFormattedSlug } from '@/utilities';
import { getCompositionBySlug, getPathsFromProjectMap } from '@/utilities/canvas';
import { AppPages, ProductPagesPrefixes } from '@/constants';
import productsHashCache from '@/data/products.json';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { slug: initialSlug = AppPages.Home } = params || {};

  const slug = getFormattedSlug(initialSlug);

  return getCompositionBySlug(slug, context, getFakeCommerceEnhancers(productsHashCache))
    .then(composition => ({
      props: {
        composition,
        preview: Boolean(preview),
        revalidate: Number.MAX_SAFE_INTEGER,
      },
    }))
    .catch(() => ({ notFound: true }));
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPathsFromProjectMap({ skipPath: ProductPagesPrefixes.ProductListPage });
  return { paths, fallback: false };
};

export default CommonContainer;
