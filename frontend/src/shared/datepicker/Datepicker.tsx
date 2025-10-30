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
  const [value, setValue] = useState(initialValue);

  function selectDate(date: Date | null) {
    setValue(date);
    onChange(date);
  }

  return (
    <ReactDatePicker
      {...inputElement.props}
      showPopperArrow={false}
      popperPlacement="top-start"
      customInput={inputElement}
      dateFormat="dd.MM.yyyy"
      selected={value}
      onChange={selectDate}
    />
  );
}
