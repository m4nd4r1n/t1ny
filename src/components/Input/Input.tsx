import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import type { VariantProps } from 'tailwind-variants';

import type { PropsWithoutChildren } from '@/libs/types';

import { input } from './Input.styles';

type InputVariants = Omit<VariantProps<typeof input>, 'isLabelPlaceholder'>;

export interface InputProps
  extends PropsWithoutChildren<HTMLInputElement>,
    InputVariants {
  id?: string;
  type?: Exclude<
    React.HTMLInputTypeAttribute,
    'hidden' | 'button' | 'checkbox' | 'image' | 'radio' | 'reset' | 'submit'
  >;
  label?: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  defaultValue?: string;
  className?: string;
  value?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id = nanoid(),
      label,
      isDisabled,
      isInvalid,
      isRequired,
      fullWidth,
      description,
      errorMessage,
      className,
      'aria-label': ariaLabel,
      'aria-invalid': ariaInvalid,
      'aria-required': ariaRequired,
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      type = 'text',
      size,
      ...props
    },
    ref,
  ) => {
    const [isFilled, setIsFilled] = useState(false);
    const domRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => domRef.current as HTMLInputElement);

    const variants = {
      isDisabled,
      isInvalid,
      isRequired,
      fullWidth,
      size,
      hasLabel: !!label,
      isLabelPlaceholder:
        !props.placeholder &&
        !props.defaultValue &&
        !props.value &&
        (type === 'text' ||
          type === 'number' ||
          type === 'password' ||
          type === 'email' ||
          type === 'url' ||
          type === 'search' ||
          type === 'tel'),
    };
    const slots = input(variants);
    const ariaProps = {
      'aria-label': ariaLabel || label || props.placeholder,
      'aria-invalid': ariaInvalid || isInvalid,
      'aria-required': ariaRequired || isRequired,
      'aria-describedby': ariaDescribedBy || description || errorMessage,
      'aria-labelledby': ariaLabelledBy || id,
    };
    const hasMessage = !!description || !!errorMessage;

    const onInputWrapperClick: React.MouseEventHandler<HTMLDivElement> = (
      e,
    ) => {
      if (e.target === e.currentTarget) {
        domRef.current?.focus();
      }
    };

    const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFilled(true);
      props.onFocus?.(e);
    };

    const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      if (domRef.current?.value === '') {
        setIsFilled(false);
      }
      props.onBlur?.(e);
    };

    return (
      <div className={slots.wrapper()} data-filled={isFilled}>
        <div className={slots.inputWrapper()} onClick={onInputWrapperClick}>
          <label className={slots.label()} htmlFor={id}>
            {label}
          </label>
          <input
            id={id}
            ref={domRef}
            className={slots.input({ className })}
            disabled={isDisabled}
            required={isRequired}
            onFocus={onFocus}
            onBlur={onBlur}
            type={type}
            {...ariaProps}
            {...props}
          />
        </div>
        {hasMessage && (
          <div className={slots.messageWrapper()}>
            {errorMessage ? (
              <span className={slots.error()}>{errorMessage}</span>
            ) : description ? (
              <span className={slots.description()}>{description}</span>
            ) : null}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
