import { FC } from 'react';
import MultiCarousel, { CarouselProps } from 'react-multi-carousel';
import CarouselButtons from './CarouselButtons';
import 'react-multi-carousel/lib/styles.css';

interface Props extends Omit<CarouselProps, 'responsive'> {
  isDark?: boolean;
}

const Carousel: FC<Props> = ({ isDark, ...rest }) => (
  <MultiCarousel
    ssr
    deviceType="desktop"
    customButtonGroup={<CarouselButtons isDark={isDark} />}
    renderButtonGroupOutside
    renderDotsOutside
    arrows={false}
    shouldResetAutoplay={false}
    responsive={{
      desktop: {
        breakpoint: { max: Infinity, min: 768 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 768, min: 568 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 568, min: 0 },
        items: 1,
      },
    }}
    {...rest}
  />
);

export default Carousel;
