import { useEffect, useRef, useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import './select.scss';

export type SelectItem = {
  value: string;
  label: string;
  dotBg?: string;
};

type Props = {
  items: SelectItem[];
  activeValue: string;
  onChange: (value: string) => void;
  triggerLabel?: string;
  triggerDotBg?: string;
  hideDot?: boolean;
};

export function Select({
  items,
  activeValue,
  onChange,
  triggerLabel,
  triggerDotBg,
  hideDot = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const activeItem = items.find((i) => i.value === activeValue);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  return (
    <div className="ashen-select" ref={wrapRef}>
      <button
        type="button"
        className={`ashen-select__trigger ${open ? 'is-open' : ''} ${hideDot ? 'no-dot' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {!hideDot && (
          <span
            className="ashen-select__triggerDot"
            style={{ background: triggerDotBg ?? activeItem?.dotBg }}
          />
        )}

        <span className="ashen-select__triggerLabel">
          {triggerLabel ?? activeItem?.label ?? ''}
        </span>

        <span className="ashen-select__arrow" aria-hidden="true">
          <ChevronsUpDown size={12} />
        </span>
      </button>

      {open && (
        <div className="ashen-select__menu" role="listbox">
          {items.map((item) => {
            const isActive = item.value === activeValue;

            return (
              <div
                key={item.value}
                className="ashen-select__item"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                <div
                  className={`ashen-select__itemInner ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {item.dotBg && (
                    <span
                      className="ashen-select__itemDot"
                      style={{ background: item.dotBg }}
                    />
                  )}

                  <span className="ashen-select__itemLabel">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}