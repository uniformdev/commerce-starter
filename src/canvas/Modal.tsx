import { FC, useCallback, useState } from 'react';
import { registerUniformComponent, ComponentProps, UniformSlot } from '@uniformdev/canvas-react';
import classNames from 'classnames';

export type Props = ComponentProps<{
  closeOnClickOutside: boolean;
  maxWidth: Types.AvailableModalMaxWidth;
}>;

const getModalMaxWidth = (maxWidth: Types.AvailableModalMaxWidth) => {
  switch (maxWidth) {
    case 'small':
      return 'max-w-sm';
    case 'medium':
      return 'max-w-md';
    case 'large':
      return 'max-w-lg';
    case 'xLarge':
      return 'max-w-xl';
    default:
      return 'max-w-max';
  }
};

const Modal: FC<Props> = ({ closeOnClickOutside, maxWidth }) => {
  const [showModal, setShowModal] = useState(false);

  const onToggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const onClickOutside = useCallback(() => {
    if (closeOnClickOutside) {
      setShowModal(false);
    }
  }, [closeOnClickOutside]);

  const onClickContent = useCallback((e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <span onClick={onToggleModal}>
        <UniformSlot name="trigger" />
      </span>
      <dialog
        open={showModal}
        className={classNames('modal w-full h-full', {
          'modal-open': showModal,
        })}
        onClick={onClickOutside}
      >
        <form
          method="dialog"
          className={classNames('modal-box p-8', getModalMaxWidth(maxWidth))}
          onClick={onClickContent}
        >
          <div onClick={onToggleModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </div>
          <UniformSlot name="content" />
        </form>
      </dialog>
    </>
  );
};

registerUniformComponent({
  type: 'modal',
  component: Modal,
});

export default Modal;
