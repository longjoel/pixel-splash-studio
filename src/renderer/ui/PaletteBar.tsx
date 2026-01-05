import React from 'react';
import { usePaletteStore } from '@/state/paletteStore';

const PaletteBar = () => {
  const colors = usePaletteStore((state) => state.colors);
  const primaryIndex = usePaletteStore((state) => state.primaryIndex);
  const secondaryIndex = usePaletteStore((state) => state.secondaryIndex);
  const addColor = usePaletteStore((state) => state.addColor);
  const setColor = usePaletteStore((state) => state.setColor);
  const setPrimary = usePaletteStore((state) => state.setPrimary);
  const setSecondary = usePaletteStore((state) => state.setSecondary);

  const handleColorPick = (index: number, current: string) => {
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = current;
    picker.style.position = 'fixed';
    picker.style.left = '-9999px';
    document.body.appendChild(picker);
    picker.addEventListener(
      'change',
      () => {
        setColor(index, picker.value);
        document.body.removeChild(picker);
      },
      { once: true }
    );
    picker.click();
  };

  return (
    <div className="palette-bar">
      <div className="palette-bar__colors">
        <div className="palette-bar__primary">
          <span>Primary</span>
          <div
            className="palette-bar__chip"
            style={{ backgroundColor: colors[primaryIndex] }}
          />
        </div>
        <div className="palette-bar__secondary">
          <span>Secondary</span>
          <div
            className="palette-bar__chip"
            style={{ backgroundColor: colors[secondaryIndex] }}
          />
        </div>
      </div>
      <div className="palette-bar__swatches">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            type="button"
            className="palette-bar__swatch"
            style={{ backgroundColor: color }}
            aria-label={`Palette color ${index}`}
            data-primary={index === primaryIndex}
            data-secondary={index === secondaryIndex}
            onClick={(event) => {
              if (event.ctrlKey) {
                handleColorPick(index, color);
                return;
              }
              setPrimary(index);
            }}
            onContextMenu={(event) => {
              event.preventDefault();
              setSecondary(index);
            }}
          />
        ))}
        <button
          type="button"
          className="palette-bar__swatch palette-bar__swatch--empty"
          aria-label="Add palette color"
          onClick={() => addColor('#ffffff')}
        />
      </div>
    </div>
  );
};

export default PaletteBar;
