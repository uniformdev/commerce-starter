import { FC, ReactElement } from 'react';
import classNames from 'classnames';

interface Props {
  title: string;
  imageComponent?: ReactElement;
  text?: string;
  className?: string;
}

const InformationContent: FC<Props> = ({ title, imageComponent = '', text = '', className }) => (
  <div className={classNames('pt-14 lg:mb-28 flex flex-col justify-center items-center h-full text-center', className)}>
    <div className="mt-7 font-bold text-3xl">{title}</div>
    {imageComponent && <div className="mt-7">{imageComponent}</div>}
    {text && <div className="mt-7">{text}</div>}
  </div>
);

export default InformationContent;
