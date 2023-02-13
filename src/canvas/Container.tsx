import { FC } from 'react';
import { UniformSlot, ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import BaseContainer, { Props as BaseContainerProps } from '@/components/Container';

const Container: FC<ComponentProps<BaseContainerProps>> = props => (
  <BaseContainer {...props}>
    <UniformSlot name="content" />
  </BaseContainer>
);

registerUniformComponent({
  type: 'container',
  component: Container,
});

export default Container;
