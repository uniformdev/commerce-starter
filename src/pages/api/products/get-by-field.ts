import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import corsConfig from '../cors-config';
import productsHashCache from '@/data/products.json';
import { getProductsByField } from '@/utilities/products';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, corsConfig);
  const [fieldName] = Object.keys(req.query);
  const fieldValue = req.query[fieldName];
  const products = getProductsByField(productsHashCache, fieldName, fieldValue);

  return res.status(200).json(products);
};
