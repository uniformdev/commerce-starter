import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getProductSearchResult } from '@/utilities/products';
import corsConfig from '../cors-config';
import productsHashCache from '@/data/products.json';

const prepareSearchParams = (searchParam: object) => {
  return Object.entries(searchParam).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value) {
      acc[key] = String(value);
    }
    return acc;
  }, {});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, corsConfig);

  const searchParams = prepareSearchParams(req.query);
  const searchResult = getProductSearchResult(Object.values(productsHashCache), searchParams);

  return res.status(200).json(searchResult);
};
