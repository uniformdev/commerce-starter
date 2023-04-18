import { FC } from 'react';
import Image from 'next/image';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '@/components-library/Container';
import ButtonLink from '@/components-library/ButtonLink';
import { getFormattedLink } from '@/utilities';

export enum HeroVariants {
  Centered = 'centered',
}

type HeroProps = ComponentProps<{
  title: string;
  subtitle?: string;
  buttonCopy?: string;
  buttonLink?: string;
  backgroundImage: string;
}>;

type ExtendedHeroProps = Omit<HeroProps, 'buttonLink'> & {
  buttonLink?:
    | {
        path: string;
        nodeId: string;
        projectMapId: string;
      }
    | string;
};

const HeroDefault: FC<HeroProps> = ({ buttonLink = '', backgroundImage }) => (
  <div className="relative">
    {Boolean(backgroundImage) && (
      <Image className="absolute w-full h-full object-cover" src={backgroundImage} fill alt="hero-image" priority />
    )}
    <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None} backgroundClassName="pt-40">
      <div className="bg-neutral-800 md:bg-orange-900 relative md:-bottom-11 ml-auto w-full md:max-w-[658px] p-12 md:pl-24 md:pr-7 md:py-20 z-10">
        <UniformText as="p" parameterId="title" className="font-bold text-3xl md:text-4xl lg:text-5xl text-white" />
        <UniformText as="p" parameterId="subtitle" className="mt-7 font-extrabold text-white" />

        {buttonLink && (
          <ButtonLink
            href={buttonLink}
            text={<UniformText parameterId="buttonCopy" />}
            className="lg:w-1/2 mt-9 text-sm max-w-full"
          />
        )}
      </div>
    </Container>
  </div>
);

const HeroCentered: FC<HeroProps> = ({ title, subtitle, buttonCopy = '', buttonLink = '', backgroundImage }) => (
  <div className="relative">
    {Boolean(backgroundImage) && (
      <Image className="absolute w-full h-full object-cover" src={backgroundImage} fill alt="hero-image" priority />
    )}
    <div className="relative flex items-center flex-col px-4 py-56 z-30">
      <p className="text-white text-3xl md:text-5xl font-bold text-center max-w-[600px]">{title}</p>
      {Boolean(subtitle) && <p className="mt-7 font-extrabold text-white">{subtitle}</p>}
      {buttonCopy && buttonLink && (
        <ButtonLink text={buttonCopy} href={buttonLink} className="mt-9 text-sm md:w-[329px] max-w-full" />
      )}
    </div>
  </div>
);

const transformData = (BaseComponent: FC<HeroProps>): FC<HeroProps> =>
  function wrapper({ buttonLink, backgroundImage, ...props }: ExtendedHeroProps) {
    const transformedProps: HeroProps = {
      ...props,
      buttonLink: typeof buttonLink === 'string' ? buttonLink : buttonLink?.path,
      backgroundImage: getFormattedLink(backgroundImage),
    };
    return <BaseComponent {...transformedProps} />;
  };

const Hero: FC<HeroProps> = props =>
  props.component.variant === HeroVariants.Centered ? <HeroCentered {...props} /> : <HeroDefault {...props} />;

registerUniformComponent({
  type: 'hero',
  component: transformData(Hero),
});

registerUniformComponent({
  type: 'hero',
  component: transformData(HeroCentered),
  variantId: 'centered',
});

export default Hero;
