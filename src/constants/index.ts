export enum ProductPagesPrefixes {
  ProductListPage = '/shop',
  ProductDetailsPage = '/products',
}

export const AppPages = {
  Home: '/',
  CoffeeMakers: `${ProductPagesPrefixes.ProductListPage}/coffee-makers`,
  Beans: `${ProductPagesPrefixes.ProductListPage}/beans`,
  Cart: `/cart`,
};

export const InternalCompositionSlugs = {
  ProductDetails: '/product-detail',
  ProductListingPrefix: ProductPagesPrefixes.ProductListPage,
};

export const AppNavigation = [
  {
    link: AppPages.Home,
    title: 'Home',
  },
  {
    link: AppPages.CoffeeMakers,
    title: 'Coffee Makes',
  },
  {
    link: AppPages.Beans,
    title: 'Beans',
  },
];
