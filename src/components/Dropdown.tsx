import { FC, useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

interface Option {
  label: string;
  value: string | undefined;
}

interface DropdownOptionProps {
  option: Option;
  isDefault?: boolean;
  onSelect: (value: string | undefined) => void;
}

const DropdownOption: FC<DropdownOptionProps> = ({ option, isDefault, onSelect }) => {
  const handleSelect = useCallback((): void => onSelect(option.value), [onSelect, option]);

  return (
    <button
      className={classNames('block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4 hover:opacity-50', {
        'opacity-50 hover:opacity-100': isDefault,
      })}
      onClick={handleSelect}
      tabIndex={-1}
    >
      {option.label}
    </button>
  );
};

interface Props {
  title: string;
  defaultOption?: Option;
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

const Dropdown: FC<Props> = ({ title, value, defaultOption, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMouseLeave = useCallback((): void => setIsOpen(false), []);

  const toggleDropdown = useCallback((): void => setIsOpen(isOpen => !isOpen), []);

  const selectedLabel = useMemo(() => {
    const selectedOption = options.find(({ value: optionValue }) => optionValue === value);
    return selectedOption?.label;
  }, [options, value]);

  const optionToShow = useMemo(
    () => options.filter(({ value: optionValue }) => optionValue !== value),
    [options, value]
  );

  const onSelect = useCallback(
    (selectedValue?: string) => {
      onChange(selectedValue);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div onMouseLeave={onMouseLeave} className="relative inline-block w-full h-12">
      <button
        type="button"
        className={classNames(
          'inline-flex items-center justify-between w-full h-full px-4 uppercase font-extrabold border-2 border-black focus:outline-none focus:border-slate-300',
          { 'text-xs': !!value }
        )}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {selectedLabel || title}
        <Image
          className={classNames('w-auto', { 'rotate-180': isOpen })}
          width={18}
          height={11}
          src="https://res.cloudinary.com/uniformdev/image/upload/v1675765487/vNext%20Demos/icons/icon-dropdown_fpirma.svg"
          alt="icon minus"
          unoptimized
        />
      </button>
      {isOpen && (
        <div
          className="z-50 origin-top-right absolute right-0 w-full rounded-b-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {defaultOption && value !== defaultOption.value && (
              <DropdownOption isDefault option={defaultOption} onSelect={onSelect} />
            )}
            {optionToShow.map(option => (
              <DropdownOption key={`option-${option.value}`} option={option} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
