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
        'ashen-btn',
        `ashen-btn--${variant}`,
        disabled ? 'ashen-btn--disabled' : '',
        className ?? '',
      ].join(' ')}
    />
  );
});

Button.displayName = 'Button';