import { GetStaticProps, GetStaticPaths } from 'next';
import { getFakeCommerceEnhancers } from '@/enhancers/commerce';
import { CommonContainer } from '@/components-library';
import { getCompositionBySlug } from '@/utilities/canvas';
import { getProductIdByProductSlug } from '@/utilities/products';
import { InternalCompositionSlugs, ProductPagesPrefixes } from '@/constants';
import productsHashCache from '@/data/products.json';

export const getStaticProps: GetStaticProps<{ preview?: boolean }> = async context => {
  const { preview, params } = context;
  const { slug } = params || {};

  const productId = getProductIdByProductSlug(slug as string);

  return getCompositionBySlug(
    InternalCompositionSlugs.ProductDetails,
    context,
    getFakeCommerceEnhancers(productsHashCache, { productId })
  )
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
  const products = Object.values(productsHashCache);

  const paths = products
    ? products.map((product: Type.Product) => `${ProductPagesPrefixes.ProductDetailsPage}/${product.slug}`)
    : [];

  return { paths, fallback: false };
};

export default CommonContainer;
