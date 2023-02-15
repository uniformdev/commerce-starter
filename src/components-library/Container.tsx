import { FC, ReactNode } from 'react';
import classNames from 'classnames';

export enum BackgroundTypes {
  White = 'White',
  Dark = 'Dark',
  LightGray = 'LightGray',
}

export enum PaddingSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  None = 'None',
}

const PaddingTopClasses = {
  [PaddingSize.Large]: 'pt-16 md:pt-28',
  [PaddingSize.Medium]: 'pt-10 lg:pt-20',
  [PaddingSize.Small]: 'pt-6 lg:pt-8',
  [PaddingSize.None]: '',
};

const PaddingBottomClasses = {
  [PaddingSize.Large]: 'pb-16 md:pb-28',
  [PaddingSize.Medium]: 'pb-10 lg:pb-20',
  [PaddingSize.Small]: 'pb-6 lg:pb-8',
  [PaddingSize.None]: '',
};

const BackgroundClasses = {
  [BackgroundTypes.White]: 'bg-white text-black',
  [BackgroundTypes.LightGray]: 'bg-gray-50 text-black',
  [BackgroundTypes.Dark]: 'bg-black text-white',
};

export type Props = {
  backgroundType?: BackgroundTypes;
  paddingTop?: PaddingSize;
  paddingBottom?: PaddingSize;
  children: ReactNode;
  backgroundClassName?: string;
  className?: string;
};

type BackgroundWrapperProps = Required<Omit<Props, 'className'>>;

const BackgroundWrapper: FC<BackgroundWrapperProps> = ({
  backgroundType,
  paddingTop,
  paddingBottom,
  children,
  backgroundClassName,
}) =>
  BackgroundTypes[backgroundType] ? (
    <div
      className={classNames(
        BackgroundClasses[backgroundType],
        PaddingTopClasses[paddingTop],
        PaddingBottomClasses[paddingBottom],
        backgroundClassName
      )}
    >
      {children}
    </div>
  ) : (
    <>children</>
  );

export const BaseContainer: FC<Props> = ({ children, className }) => (
  <div className={classNames('px-8 m-auto max-w-screen-xl', className)}>{children}</div>
);

const Container: FC<Props> = ({
  backgroundType = BackgroundTypes.White,
  paddingTop = PaddingSize.Medium,
  paddingBottom = PaddingSize.Medium,
  children,
  backgroundClassName = '',
  className,
}) => (
  <BackgroundWrapper
    paddingTop={paddingTop}
    backgroundType={backgroundType}
    paddingBottom={paddingBottom}
    backgroundClassName={backgroundClassName}
  >
    <BaseContainer className={className}>{children}</BaseContainer>
  </BackgroundWrapper>
);

export default Container;
