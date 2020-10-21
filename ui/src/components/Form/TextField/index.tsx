import c from 'classnames';
import { connect, FormikContextType, getIn } from 'formik';
import React from 'react';
import { MutableRefObject } from 'react';
import ErrorMessage from 'src/components/Form/ErrorMessage';

import s from './style.module.scss';

export interface TextFieldProps {
  /**
   * CSS class given to the actual <input /> element
   */
  name: string;
  className?: string;
  /**
   * CSS class given to the actual <input /> element
   */
  inputClassName?: string;
  placeholder?: string;
  /**
   * CSS class given to the actual <input /> element
   */
  inputRef?: MutableRefObject<HTMLInputElement | null>;
  tabIndex?: number;
  type?: string;
  onkeyDown?: any;
}

/**
 * Input field for Formik forms. It must be used inside a formik context.
 *
 * *Note:* Errors are considered only after the field is touched (focused and then
 * unfocused) at lest once.
 */
const TextField: React.FC<TextFieldProps & { formik: FormikContextType<{}> }> = ({
  formik,
  ...p
}) => {
  const isTouched = getIn(formik.touched, p.name);
  const error = isTouched ? getIn(formik.errors, p.name) : null;
  const inputProps = formik.getFieldProps(p.name);

  const containerClass = c(p.className, {
    [s['has-error']]: error,
    [s.container]: !p.className,
  });

  return (
    <div className={containerClass}>
      <input
        className={p.inputClassName}
        type={p.type || 'text'}
        tabIndex={p.tabIndex}
        placeholder={p.placeholder}
        {...inputProps}
        ref={p.inputRef}
        onKeyDown={p.onkeyDown}
        disabled={formik.isSubmitting}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export default connect(TextField) as React.FC<TextFieldProps>;
