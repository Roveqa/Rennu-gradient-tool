import { memo } from 'react';
import './divider.scss';

export const Divider = memo(function Divider() {
  return <div className="ashen-divider" />;
});

Divider.displayName = 'Divider';