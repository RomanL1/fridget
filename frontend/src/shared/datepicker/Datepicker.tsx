import { JSX } from 'react';
import { DatePicker as ReactDatePicker } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

interface DatepickerProps {
  value?: Date | null;
  inputElement: JSX.Element;
  onChange: (date: Date | null) => void;
}

export function Datepicker({ value = null, inputElement, onChange }: DatepickerProps) {
  return (
    <ReactDatePicker
      {...inputElement.props}
      showPopperArrow={false}
      popperPlacement="top-start"
      customInput={inputElement}
      dateFormat="dd.MM.yyyy"
      selected={value}
      onChange={onChange}
    />
  );
}
