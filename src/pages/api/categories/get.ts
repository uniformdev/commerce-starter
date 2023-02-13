import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import corsConfig from '../cors-config';
import categories from '@/data/categories.json';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, corsConfig);
  return res.status(200).json(categories);
};

export default handler;
