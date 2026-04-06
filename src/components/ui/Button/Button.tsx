import { memo, type ButtonHTMLAttributes } from 'react';
import './button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
};

export const Button = memo(function Button({ 
  variant, 
  className, 
  disabled,
  ...props 
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        'rennu-btn',
        `rennu-btn--${variant}`,
        disabled ? 'rennu-btn--disabled' : '',
        className ?? '',
      ].join(' ')}
    />
  );
});

Button.displayName = 'Button';
