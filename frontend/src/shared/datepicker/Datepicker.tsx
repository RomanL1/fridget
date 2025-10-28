import { JSX, useState } from 'react';
import { DatePicker as ReactDatePicker } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

interface DatepickerProps {
  initialValue: Date | null;
  inputElement: JSX.Element;
  onChange: (date: Date | null) => void;
}

export function Datepicker({ initialValue, inputElement, onChange }: DatepickerProps) {
  const [value, setValue] = useState<Date | null>(initialValue);

  function selectDate(date: Date | null) {
    setValue(date);
    onChange(date);
  }

  return (
    <ReactDatePicker
      showPopperArrow={false}
      popperPlacement="bottom-start"
      customInput={inputElement}
      placeholderText="Select date"
      dateFormat="dd.MM.yyyy"
      selected={value}
      onChange={selectDate}
    />
  );
}
