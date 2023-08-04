import { FC } from 'react';
import {
  registerUniformComponent,
  useUniformCurrentComposition,
  ComponentProps,
  UniformText,
} from '@uniformdev/canvas-react';
import BaseButton from '../components/Button';

export type Props = ComponentProps<{
  copy: string;
  link: Types.ProjectMapLink;
  style: Types.ButtonStyles;
}>;

const Button: FC<Props> = ({ link, style }) => {
  const { isContextualEditing } = useUniformCurrentComposition();
  return (
    <BaseButton
      href={link?.path}
      copy={
        <UniformText
          placeholder="buttonCopy goes here"
          parameterId="copy"
          onClick={isContextualEditing ? e => e.preventDefault() : undefined}
        />
      }
      style={style}
    />
  );
};

registerUniformComponent({
  type: 'button',
  component: Button,
});

export default Button;
