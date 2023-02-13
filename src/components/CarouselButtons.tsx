import { FC, useCallback, useMemo } from 'react';
import { ButtonGroupProps } from 'react-multi-carousel';
import ButtonArrow from './ButtonArrow';

interface Props extends ButtonGroupProps {
  isDark?: boolean;
}

const CarouselButtons: FC<Props> = ({ previous, next, goToSlide, carouselState, isDark }) => {
  const { totalItems = 0, currentSlide = 0, slidesToShow = 0 } = carouselState || {};

  const isLastSlide = useMemo(
    () => currentSlide + 1 === totalItems - slidesToShow + 1,
    [currentSlide, totalItems, slidesToShow]
  );

  const lastSlideIndex = useMemo(() => totalItems - slidesToShow, [slidesToShow, totalItems]);

  const handleNext = useCallback(() => {
    if (isLastSlide && goToSlide) return goToSlide(0);
    if (next) next();
  }, [goToSlide, isLastSlide, next]);

  const handlePrevious = useCallback(() => {
    if (!currentSlide && goToSlide) return goToSlide(lastSlideIndex);
    if (previous) previous();
  }, [currentSlide, goToSlide, lastSlideIndex, previous]);

  return totalItems > slidesToShow ? (
    <div className="flex justify-center sm:justify-end items-center mt-6 lg:mt-9">
      <ButtonArrow onClick={handlePrevious} isDark={isDark} direction="left" />
      <p className="min-w-[90px] text-center font-bold">
        {currentSlide + 1} / {totalItems - slidesToShow + 1}
      </p>
      <ButtonArrow onClick={handleNext} isDark={isDark} direction="right" />
    </div>
  ) : null;
};

export default CarouselButtons;
