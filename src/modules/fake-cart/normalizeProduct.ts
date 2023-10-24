const normalizeProduct = (payload: CommerceTypes.AddToCartItem): CommerceTypes.Product => {
  try {
    const isImagesNormalized = (payload.images as CommerceTypes.ProductImage[])[0]?.id;

    return {
      id: payload.id,
      slug: payload.slug,
      name: payload.name as string,
      description: payload.description as string,
      price: payload.ec_price ? (payload.ec_price as number) : (payload.price as number),
      categories: (payload.categories as string[]) || [
        ...(payload.ec_category as string[]),
        ...(payload.sub_category as string[]),
      ],
      rootCategories: (payload.rootCategories as string[]) || (payload.ec_category as string[]),
      subCategories: (payload.rootCategories as string[]) || (payload.sub_category as string[]),
      images: isImagesNormalized
        ? (payload.images as CommerceTypes.ProductImage[])
        : (payload.images as string[])?.map((image: string, index) => ({
            id: index.toString(),
            url: image,
          })) || [],
      thumbnailId: (payload.thumbnailId as string) || '0',
    };
  } catch (error) {
    return {
      name: '',
      description: '',
      price: 0,
      categories: [],
      rootCategories: [],
      subCategories: [],
      images: [],
      thumbnailId: '',
      ...payload,
    };
  }
};

export default normalizeProduct;
