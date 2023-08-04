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

  type ProductsHashCache = Record<string, Product>;

  interface SearchParams {
    limit?: string;
    page?: string;
    categoryId?: string;
    keyword?: string;
    sortField?: 'price' | 'id' | 'name' | 'slug' | 'description';
    sortDirection?: string;
  }

  interface FakeCartItem {
    product: Product;
    quantity: number;
  }
}
