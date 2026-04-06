import { memo } from 'react';
import './divider.scss';

export const Divider = memo(function Divider() {
  return <div className="rennu-divider" />;
});

Divider.displayName = 'Divider';
