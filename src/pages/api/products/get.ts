import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { prepareSearchParams } from '@/utilities';
import { getProductSearchResult } from '@/utilities/products';
import corsConfig from '../cors-config';
import productsHashCache from '@/data/products.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, corsConfig);

  const searchParams = prepareSearchParams(req.query);
  const searchResult = getProductSearchResult(Object.values(productsHashCache), searchParams);

  return res.status(200).json(searchResult);
};

export default handler;
