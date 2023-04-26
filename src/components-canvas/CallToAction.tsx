import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '@/components-library/Container';
import ButtonLink from '@/components-library/ButtonLink';

type CallToActionProps = ComponentProps<{
  title: string;
  text: string;
  textAi?: string;
  buttonCopy?: string;
  buttonLink?: string;
}>;

type ExtendedCallToActionProps = Omit<CallToActionProps, 'buttonLink'> & {
  buttonLink?:
  | {
    path: string;
    nodeId: string;
    projectMapId: string;
  }
  | string;
};

const CallToAction: FC<CallToActionProps> = ({ buttonLink, textAi }) => {
  const showGeneratedText = textAi && textAi.trim().length > 0
  const parameterId = showGeneratedText ? 'textAi' : 'text'
  return (
    <Container paddingTop={PaddingSize.Large} paddingBottom={PaddingSize.Large}>
      <div className="md:w-9/12 m-auto">
        <UniformText parameterId="title" as="p" className="md:text-center font-bold text-4xl" />
        <UniformText parameterId={parameterId} as="p" isMultiline className="md:text-center mt-6" />

        {buttonLink && (
          <ButtonLink href={buttonLink} text={<UniformText parameterId="buttonCopy" />} className="mt-8 px-4" />
        )}
      </div>
    </Container>
  )
};

const transformData = (BaseComponent: FC<CallToActionProps>): FC<CallToActionProps> =>
  function wrapper({ buttonLink, ...props }: ExtendedCallToActionProps) {
    const transformedProps: CallToActionProps = {
      ...props,
      buttonLink: typeof buttonLink === 'string' ? buttonLink : buttonLink?.path,
    };
    return <BaseComponent {...transformedProps} />;
  };

registerUniformComponent({
  type: 'callToAction',
  component: transformData(CallToAction),
});

export default CallToAction;
