import getConfig from 'next/config';
import { enhance } from '@uniformdev/canvas';
import { createPreviewHandler } from '@uniformdev/canvas-next';
import { getFakeCommerceEnhancers } from '@/enhancers/commerce';
import categories from '@/data/categories.json';
import productsHashCache from '@/data/products.json';

// Preview Mode, more info https://nextjs.org/docs/advanced-features/preview-mode
export default createPreviewHandler({
  secret: () => getConfig().serverRuntimeConfig.previewSecret,
  enhance: composition =>
    enhance({
      composition,
      enhancers: getFakeCommerceEnhancers(productsHashCache, { categories }),
      context: { preview: true },
    }),
});
