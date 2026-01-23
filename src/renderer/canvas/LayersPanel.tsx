import React from 'react';
import { usePixelStore } from '@/state/pixelStore';

const LayersPanel = () => {
  const layers = usePixelStore((state) => state.layers);
  const activeLayerId = usePixelStore((state) => state.activeLayerId);
  const createLayer = usePixelStore((state) => state.createLayer);
  const deleteLayer = usePixelStore((state) => state.deleteLayer);
  const renameLayer = usePixelStore((state) => state.renameLayer);
  const toggleLayerVisible = usePixelStore((state) => state.toggleLayerVisible);
  const moveLayer = usePixelStore((state) => state.moveLayer);
  const setActiveLayer = usePixelStore((state) => state.setActiveLayer);

  const ordered = [...layers].reverse();

  return (
    <div className="layers-panel" aria-label="Layers panel">
      <div className="layers-panel__actions">
        <button type="button" className="panel__item" onClick={() => createLayer()}>
          + Layer
        </button>
        <button
          type="button"
          className="panel__item"
          onClick={() => deleteLayer(activeLayerId)}
          disabled={layers.length <= 1}
        >
          Delete
        </button>
      </div>

      <div className="layers-panel__list" role="list">
        {ordered.map((layer) => {
          const index = layers.findIndex((candidate) => candidate.id === layer.id);
          const isTop = index === layers.length - 1;
          const isBottom = index === 0;
          const active = layer.id === activeLayerId;

          return (
            <div
              key={layer.id}
              role="listitem"
              className="layers-panel__row"
              data-active={active}
              onMouseDown={() => setActiveLayer(layer.id)}
            >
              <label className="layers-panel__toggle" title="Toggle visibility">
                <input
                  type="checkbox"
                  checked={layer.visible}
                  onChange={() => toggleLayerVisible(layer.id)}
                  onMouseDown={(event) => event.stopPropagation()}
                />
              </label>

              <input
                className="layers-panel__name"
                value={layer.name}
                onChange={(event) => renameLayer(layer.id, event.target.value)}
                onMouseDown={(event) => event.stopPropagation()}
              />

              <div className="layers-panel__move">
                <button
                  type="button"
                  className="panel__item"
                  title="Move up"
                  disabled={isTop}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={() => moveLayer(layer.id, 'up')}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="panel__item"
                  title="Move down"
                  disabled={isBottom}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={() => moveLayer(layer.id, 'down')}
                >
                  ↓
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayersPanel;

