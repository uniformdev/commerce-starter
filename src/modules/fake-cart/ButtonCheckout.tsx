import { FC, useCallback } from 'react';
import Button from '../../components/Button';

interface Props {
  cartItems?: CommerceTypes.FakeCartItem[];
}
const ButtonCheckout: FC<Props> = ({ cartItems = [] }) => {
  const onOrderComplete = useCallback(() => {
    window.dispatchEvent(new CustomEvent('Order Completed', { detail: { cartItems } }));
    alert(
      'Checkout is out of scope on this starter site. Build a checkout page in Uniform, in your code, or use a preferred solution'
    );
  }, [cartItems]);

  return <Button copy="Proceed to Checkout" style="primary" onClick={onOrderComplete} />;
};

export default ButtonCheckout;
