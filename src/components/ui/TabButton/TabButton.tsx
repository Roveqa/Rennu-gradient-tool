import { memo, type ReactNode } from 'react';
import './tabButton.scss';

type Props = {
  active?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  children: ReactNode;
};

export const TabButton = memo(function TabButton({ 
  active, 
  icon, 
  onClick, 
  children 
}: Props) {
  return (
    <button
      type="button"
      className={[
        'rennu-tabButton',
        active ? 'rennu-tabButton--active' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {icon}
      <span className="rennu-tabButton__text">{children}</span>
    </button>
  );
});

TabButton.displayName = 'TabButton';
