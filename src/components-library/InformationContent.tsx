import { FC, ReactElement } from 'react';

interface Props {
  title: string;
  imageComponent?: ReactElement;
  text?: string;
}

const InformationContent: FC<Props> = ({ title, imageComponent = '', text = '' }) => (
  <div className="pt-14 lg:mb-28 flex flex-col justify-center items-center h-full text-center">
    <div className="mt-7 font-bold text-3xl">{title}</div>
    {imageComponent && <div className="mt-7">{imageComponent}</div>}
    {text && <div className="mt-7">{text}</div>}
  </div>
);

export default InformationContent;
