declare namespace CommerceTypes {
  interface ProductImage {
    id: string;
    url: string;
  }

  interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    categories: string[];
    rootCategories?: string[];
    subCategories?: string[];
    thumbnailId: string;
    images: ProductImage[];
  }

  interface Category {
    id: string;
    name: string;
    url: string;
    parentId: string;
  }

  type ProductsHashCache = Record<string, Product>;

  interface SearchParams {
    limit?: string;
    page?: string;
    categoryId?: string;
    keyword?: string;
    sortField?: 'price' | 'id' | 'name' | 'slug' | 'description';
    sortDirection?: string;
  }

  interface AddToCartItem {
    id: string;
    slug: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  //TODO: think how to improve normalize process
  interface FakeCartAddItem {
    product: AddToCartItem;
    quantity: number;
  }

  interface FakeCartItem {
    product: Product;
    quantity: number;
  }
}
