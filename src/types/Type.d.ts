declare namespace Type {
  interface Category {
    id: string;
    name: string;
    url: string;
    parentId: string;
  }

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
    thumbnailId: string;
    images: ProductImage[];
  }

  type ProductsHashCache = Record<string, Product>;

  interface SearchParams {
    limit?: string;
    page?: string;
    categoryId?: string;
    keyword?: string;
    sortField?: 'price';
    sortDirection?: string;
  }

  interface AnnouncementProps {
    title: string;
    link: string;
    linkText: string;
  }
}
