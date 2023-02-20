import dynamic from 'next/dynamic';

const ShoppingCart = dynamic(() => import('@/components-library').then(com => com.ShoppingCart), { ssr: false });

export default ShoppingCart;
