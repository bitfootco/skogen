import React, { useState, useEffect } from 'react';
import InputField from '../InputField';

type InputMaskProps = {
  id: string;
  mask: string;
  label: string;
  maskPlaceholder?: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputMask: React.FC<InputMaskProps> = ({
  id,
  mask,
  label,
  maskPlaceholder = '_',
  value = '',
  onChange,
}) => {
  const [maskedValue, setMaskedValue] = useState('');

  useEffect(() => {
    if (value) {
      setMaskedValue(applyMask(value, mask, maskPlaceholder));
    }
  }, [value, mask, maskPlaceholder]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const newMaskedValue = applyMask(rawValue, mask, maskPlaceholder);
    setMaskedValue(newMaskedValue);
    if (onChange) {
      onChange(event);
    }
  };

  const applyMask = (value: string, mask: string, placeholder: string) => {
    let maskedValue = '';
    let valueIndex = 0;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === placeholder) {
        if (value[valueIndex]) {
          maskedValue += value[valueIndex];
          valueIndex++;
        } else {
          maskedValue += placeholder;
        }
      } else {
        maskedValue += mask[i];
        if (mask[i] === value[valueIndex]) {
          valueIndex++;
        }
      }
    }
    return maskedValue;
  };

  return (
    <InputField
      id={id}
      label={label}
      placeholder={''}
      value={maskedValue}
      onChange={handleChange}
    />
  );
};

export default InputMask;
