import { FC } from 'react';

interface Props {
  currency?: 'USD';
  amount: number;
  className?: string;
}

const CurrencyFormatter: FC<Props> = ({ currency = 'USD', amount, className }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

  return <div className={className}>{formattedPrice}</div>;
};

export default CurrencyFormatter;
