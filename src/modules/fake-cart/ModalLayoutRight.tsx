import { FC, ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  children: ReactElement;
}

const ModalLayoutRight: FC<Props> = ({ isOpen, onCloseModal, children }) => (
  <div className={classNames('fixed inset-0 z-10', { 'pointer-events-none': !isOpen })}>
    <div
      className={classNames(
        'fixed inset-0 bg-slate-500/[.5]',
        { 'pointer-events-none opacity-0': !isOpen },
        'transition-opacity duration-300 ease-in-out'
      )}
      onClick={onCloseModal}
    />
    <div
      className={classNames(
        'h-full absolute md:translate-x-4 top-0 right-0 bottom-0 md:w-[558px] w-full bg-white text-black',
        { 'opacity-100 overflow-y-auto': isOpen },
        { 'pointer-events-none opacity-0': !isOpen },
        'transition-opacity duration-300 ease-in-out'
      )}
    >
      {children}
    </div>
  </div>
);

export default ModalLayoutRight;
