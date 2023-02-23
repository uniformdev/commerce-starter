import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { getProductsByIds } from '@/utilities/products';
import corsConfig from '../cors-config';
import productsHashCache from '@/data/products.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, corsConfig);

  const { id = [] } = req.query;
  let productIds;
  if (Array.isArray(id)) {
    productIds = id;
  } else {
    productIds = id.split(',').map(e => e.trim());
  }

  const products = getProductsByIds(productsHashCache, productIds);

  return res.status(200).json(products);
};

export default handler;
