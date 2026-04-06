import { memo, useCallback, useEffect, useRef, useState } from 'react';
import './slider.scss';

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export const Slider = memo(function Slider({ 
  label, 
  value, 
  min, 
  max, 
  step, 
  onChange 
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const onChangeRef = useRef(onChange);

  // Обновляем ref при изменении onChange
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const percent = ((value - min) / (max - min)) * 100;

  // Мемоизируем функцию updateValue с useCallback
  const updateValue = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;

    let ratio = x / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));

    let next = min + ratio * (max - min);

    // snap к step
    next = Math.round(next / step) * step;

    onChangeRef.current(next);
  }, [min, max, step]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    updateValue(e.clientX);
  }, [updateValue]);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      updateValue(e.clientX);
    };

    const onUp = () => {
      setDragging(false);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging, updateValue]);

  return (
    <div
      ref={ref}
      className="rennu-slider"
      onPointerDown={onPointerDown}
      style={
        {
          ['--percent' as string]: `${percent}%`,
        } as React.CSSProperties
      }
    >
      <div className="rennu-slider__fill" />
      <div className="rennu-slider__handle" />

      <div className="rennu-slider__ui">
        <span className="rennu-slider__label">{label}</span>
        <span className="rennu-slider__value">({value})</span>
      </div>
    </div>
  );
});

Slider.displayName = 'Slider';
