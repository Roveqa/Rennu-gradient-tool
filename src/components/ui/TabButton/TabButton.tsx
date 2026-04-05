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
        'ashen-tabButton',
        active ? 'ashen-tabButton--active' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {icon}
      <span className="ashen-tabButton__text">{children}</span>
    </button>
  );
});

TabButton.displayName = 'TabButton';