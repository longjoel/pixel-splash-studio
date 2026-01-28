import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Option<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
  render?: React.ReactNode;
};

type DropdownSelectProps<T extends string> = {
  value: T;
  options: Array<Option<T>>;
  onChange: (value: T) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

type Position = {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
};

const getOptionLabel = <T extends string>(options: Array<Option<T>>, value: T) =>
  options.find((opt) => opt.value === value)?.label ?? value;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const DropdownSelect = <T extends string>({
  value,
  options,
  onChange,
  disabled,
  ariaLabel,
  className,
}: DropdownSelectProps<T>) => {
  const id = useId();
  const menuId = `dropdown-${id}`;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [position, setPosition] = useState<Position | null>(null);

  const selectedLabel = useMemo(() => getOptionLabel(options, value), [options, value]);
  const selectedIndex = useMemo(
    () => Math.max(0, options.findIndex((opt) => opt.value === value)),
    [options, value]
  );

  const computePosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return null;
    }
    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    const menuHeight = 260;
    const spaceBelow = viewportHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const placeBelow = spaceBelow >= Math.min(menuHeight, 180) || spaceBelow >= spaceAbove;
    const maxHeight = clamp(placeBelow ? spaceBelow : spaceAbove, 120, menuHeight);
    const top = placeBelow ? rect.bottom + 6 : rect.top - 6 - maxHeight;
    return { left: rect.left, top, width: rect.width, maxHeight };
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    setHighlighted(selectedIndex);
    const next = computePosition();
    setPosition(next);
    const raf = window.requestAnimationFrame(() => {
      const active = menuRef.current?.querySelector<HTMLElement>('[data-highlighted="true"]');
      active?.scrollIntoView({ block: 'nearest' });
    });
    return () => window.cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const delta = event.key === 'ArrowDown' ? 1 : -1;
        setHighlighted((prev) => {
          const next = clamp(prev + delta, 0, options.length - 1);
          return next;
        });
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        setHighlighted(0);
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        setHighlighted(options.length - 1);
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const option = options[highlighted];
        if (option && !option.disabled) {
          onChange(option.value);
          setOpen(false);
          triggerRef.current?.focus();
        }
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }
      if (triggerRef.current?.contains(target)) {
        return;
      }
      if (menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const handleReposition = (event?: Event) => {
      const target = (event?.target ?? null) as Node | null;
      if (target && menuRef.current?.contains(target)) {
        return;
      }
      const next = computePosition();
      setPosition(next);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true } as never);
      window.removeEventListener('resize', handleReposition as never);
      window.removeEventListener('scroll', handleReposition as never, { capture: true } as never);
    };
  }, [open, options, highlighted, onChange]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const active = menuRef.current?.querySelector<HTMLElement>('[data-highlighted="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [open, highlighted]);

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
    }
  };

  const handleSelect = (nextValue: T) => {
    onChange(nextValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className ?? 'panel__select'}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="dropdown-select__label">{selectedLabel}</span>
        <span className="dropdown-select__chevron" aria-hidden="true">
          ▾
        </span>
      </button>
      {open &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            className="dropdown-select__menu"
            role="listbox"
            aria-label={ariaLabel}
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
              width: `${position.width}px`,
              maxHeight: `${position.maxHeight}px`,
            }}
          >
            {options.map((opt, index) => (
              <button
                key={opt.value}
                type="button"
                role="option"
                className="dropdown-select__option"
                data-active={opt.value === value}
                data-highlighted={index === highlighted}
                disabled={opt.disabled}
                aria-selected={opt.value === value}
                onMouseMove={() => setHighlighted(index)}
                onClick={() => {
                  if (!opt.disabled) {
                    handleSelect(opt.value);
                  }
                }}
              >
                {opt.render ?? opt.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default DropdownSelect;
