import { FC, HTMLProps } from 'react';
import classNames from 'classnames';

const classes = {
  common:
    'border-2 overflow-hidden relative uppercase font-bold text-md cursor-pointer font-overpass text-center px-8 py-2.5 leading-7',
  disabled: 'pointer-events-none opacity-60',
  loading: 'pointer-events-none',
  primary: 'bg-white border-black text-black hover:border-white hover:text-white hover:bg-black',
  secondary: 'bg-black border-black text-white hover:border-black hover:text-black hover:bg-white',
};

interface Props {
  isLoading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  styleType?: 'primary' | 'secondary';
}

const ButtonAction: FC<HTMLProps<HTMLButtonElement> & Props> = ({
  children,
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
  styleType = 'secondary',
  onClick,
}) => (
  <button
    disabled={disabled || isLoading}
    onClick={onClick}
    type={type}
    className={classNames(
      classes.common,
      classes[styleType],
      { [classes.disabled]: disabled, [classes.loading]: isLoading },
      className
    )}
  >
    <div className="flex items-center justify-center">
      {children}
      {isLoading && (
        <>
          <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-black to-white animate-one" />
          <span className="absolute top-0 right-0 animation-delay-500 h-full w-0.5 bg-gradient-to-b from-black to-white animate-two" />
          <span className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-black to-white animate-three" />
          <span className="absolute top-0 left-0 h-full w-0.5 animation-delay-500 bg-white bg-gradient-to-t from-black to-white animate-four" />
        </>
      )}
    </div>
  </button>
);

export default ButtonAction;
