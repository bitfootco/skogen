'use client';

import React, { useRef } from 'react';
import InputField from '../InputField';

type InputMaskProps = {
  id: string;
  mask: string;
  label: string;
  maskPlaceholder?: string;
  value: string;
  onChange: (input: string) => void;
};

const InputMask: React.FC<InputMaskProps> = ({
  id,
  mask,
  label,
  maskPlaceholder = '#',
  value = '',
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ''); // Remove all non-digit characters
    const cursorPosition = event.target.selectionStart ?? 0;
    const newMaskedValue = applyMask(rawValue);
    const adjustedCursorPosition = calculateCursorPosition(
      event.target.value,
      newMaskedValue,
      cursorPosition,
    );
    onChange(newMaskedValue);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(
          adjustedCursorPosition,
          adjustedCursorPosition,
        );
      }
    }, 0);
  };

  const applyMask = (value: string) => {
    let maskedValue = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === maskPlaceholder) {
        if (value[valueIndex]) {
          maskedValue += value[valueIndex];
          valueIndex++;
        } else {
          maskedValue += maskPlaceholder;
        }
      } else {
        maskedValue += mask[i];
      }
    }

    return maskedValue;
  };

  const calculateCursorPosition = (
    rawInput: string,
    maskedValue: string,
    cursorPosition: number,
  ) => {
    let maskIndex = 0;
    let rawIndex = 0;

    while (maskIndex < cursorPosition) {
      if (mask[maskIndex] === maskPlaceholder) {
        if (rawInput[maskIndex] && rawInput[maskIndex].match(/\d/)) {
          rawIndex++;
        }
      }
      maskIndex++;
    }

    // Adjust cursor position to ensure it doesn't skip over mask characters
    let newCursorPosition = rawIndex;
    while (
      maskedValue[newCursorPosition] &&
      maskedValue[newCursorPosition] !== maskPlaceholder
    ) {
      newCursorPosition++;
    }

    return newCursorPosition;
  };

  return (
    <InputField
      id={id}
      label={label}
      placeholder={mask}
      value={value}
      onChange={handleChange}
      ref={inputRef}
    />
  );
};

export default InputMask;
