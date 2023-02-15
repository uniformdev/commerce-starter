import { FC, RefObject, ReactElement, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Transition from './Transition';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  children: ReactElement;
}

const ModalLayoutRight: FC<Props> = ({ isOpen, onCloseModal, children }) => {
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && event.target && !wrapperRef.current.contains(event.target as Node)) {
        onCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCloseModal, wrapperRef]);

  return (
    <div
      className={classNames('fixed top-0 bottom-0 left-0 right-0 bg-slate-500/[.5] z-[100]', {
        'w-0': !isOpen,
        'w-full': isOpen,
      })}
    >
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-0"
        leaveTo="opacity-0 scale-1"
        className={classNames(
          'h-full absolute md:translate-x-4 top-0 right-0 bottom-0 md:w-[558px] w-full bg-white text-black z-[100]',
          { 'overflow-y-auto': isOpen }
        )}
      >
        <div ref={wrapperRef} className="flex flex-col">
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default ModalLayoutRight;
