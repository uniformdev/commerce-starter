import { EnhancerBuilder, ComponentParameter, ChildEnhancerBuilder } from '@uniformdev/canvas';
import {
  FAKE_COMMERCE_PARAMETER_TYPES,
  parameterIsProductSelector,
  isParameterProductSelectorDefined,
  MeshEditorProductSelectorParams,
} from '@uniformdev/canvas-fake-commerce';
import { getProductSearchResult } from '@/utilities/products';

const getRelatedProducts = (productsHashCache: Type.ProductsHashCache, productId: string) => {
  const product = productsHashCache[productId];
  const productCategories = product?.categories || [];
  return Object.values(productsHashCache).filter(
    item => item.categories.some(category => productCategories.includes(category)) && item.id !== product?.id
  );
};

interface EnhanceParameter {
  parameter: ComponentParameter<MeshEditorProductSelectorParams>;
}

interface GetFakeCommerceEnhancersParams {
  productId?: string;
  category?: string;
  subCategory?: string;
  categories?: Type.Category[];
}

interface ProductComponentParameterEnhancerParams {
  productId: string;
}

interface ProductListComponentParameterEnhancerParams {
  category: string;
  subCategory?: string;
  categories: Type.Category[];
}

const VisualCanvasDefaultParams = {
  productId: '80',
  category: 'coffee-makers',
};

const getComponentParameterEnhancer = (productsHashCache: Type.ProductsHashCache) => ({
  enhanceOne: async function Enhancer({ parameter }: EnhanceParameter) {
    if (parameterIsProductSelector(parameter)) {
      if (!isParameterProductSelectorDefined(parameter.value)) {
        return null;
      }

      return parameter.value.productIds?.reduce<Type.Product[]>((acc, id) => {
        if (productsHashCache[id]) {
          return [...acc, productsHashCache[id]];
        }
        return acc;
      }, []);
    }
  },
});

const getProductComponentParameterEnhancer =
  (productsHashCache: Type.ProductsHashCache, options: ProductComponentParameterEnhancerParams) =>
  (builder: ChildEnhancerBuilder) => {
    builder.data('product', () => productsHashCache[options.productId]);
  };

const getRelatedProductComponentParameterEnhancer =
  (productsHashCache: Type.ProductsHashCache, options: ProductComponentParameterEnhancerParams) =>
  (builder: ChildEnhancerBuilder) => {
    builder.data('relatedProducts', () => getRelatedProducts(productsHashCache, options?.productId));
  };

const getProductListComponentParameterEnhancer =
  (productsHashCache: Type.ProductsHashCache, options: ProductListComponentParameterEnhancerParams) =>
  (builder: ChildEnhancerBuilder) => {
    const { category, subCategory, categories } = options;

    const products = Object.values(productsHashCache);
    const currentMainCategory = categories.find(item => item.url === category);
    const currentCategory = categories.find(item => item.url === (subCategory || category));

    builder.data('categories', () => categories?.filter(item => item.parentId === currentMainCategory?.id));
    builder.data('prefetchedSearchResult', () => {
      const { data } = getProductSearchResult(products, {
        categoryId: currentCategory?.id,
      });

      return data;
    });
    builder.data('activeCategory', () => currentCategory);
  };

export const getFakeCommerceEnhancers = (
  productsHashCache: Type.ProductsHashCache,
  options?: GetFakeCommerceEnhancersParams
): EnhancerBuilder => {
  // We should set default value to this enhancer to make it works with visual canvas
  const {
    productId = VisualCanvasDefaultParams.productId,
    category = VisualCanvasDefaultParams.category,
    subCategory,
    categories = [],
  } = options || {};
  return new EnhancerBuilder()
    .parameterType(FAKE_COMMERCE_PARAMETER_TYPES, getComponentParameterEnhancer(productsHashCache))
    .component(
      ['productInfo', 'productImageGallery', 'productDescription', 'addToCart'],
      getProductComponentParameterEnhancer(productsHashCache, { productId })
    )
    .component(['relatedProducts'], getRelatedProductComponentParameterEnhancer(productsHashCache, { productId }))
    .component(
      ['productCatalog'],
      getProductListComponentParameterEnhancer(productsHashCache, {
        category,
        subCategory,
        categories,
      })
    );
};
