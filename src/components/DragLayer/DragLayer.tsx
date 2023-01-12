import React, { CSSProperties, memo, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { DragPreviewOptions, useDragDropManager, useDragLayer, XYCoord } from 'react-dnd';
import ReactDOM, { render } from 'react-dom';
import { DragItemTypes } from '../drag/DragItemTypes';
import CardDragPreview from '../drag/Previews/CardDragPreview/CardDragPreview';
import styles from './DragLayer.module.scss';
import {
  getCSSTranslate,
  getCurrentSourceNode,
  getCurrentSourcePreviewNodeOptions,
  getDragPreviewOffSet,
} from '../drag/utils';

interface DragLayerProps {
  scrollContainer: React.MutableRefObject<HTMLElement | undefined>;
}

const DragLayer = (props: DragLayerProps) => {
  const { scrollContainer } = props;
  const previewRef = useRef<HTMLElement>();
  const sourceRef = useRef<HTMLElement>();
  const previewOptionsRef = useRef<DragPreviewOptions>();
  const previewOffsetRef = useRef<XYCoord>({ x: -999, y: -999 });

  const { item, itemType, isDragging, initialCursorOffset, initialSourceOffset, clientOffSet } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      initialCursorOffset: monitor.getInitialClientOffset(),
      initialSourceOffset: monitor.getInitialSourceClientOffset(),
      clientOffSet: monitor.getClientOffset(),
    }));

  const dragDropManager = useDragDropManager();
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'not-allowed';

      sourceRef.current = getCurrentSourceNode(dragDropManager);
      previewOptionsRef.current = getCurrentSourcePreviewNodeOptions(dragDropManager);
    } else {
      document.body.style.cursor = 'default';

      sourceRef.current = undefined;
      previewOptionsRef.current = undefined;
      previewOffsetRef.current = { x: -999, y: -999 };
    }
  }, [isDragging]);

  // Here we add new drag previews accordingly to the dragged item type
  const renderPreview = useMemo(() => {
    switch (itemType) {
      case DragItemTypes.TIMELINE_CARD:
        return <CardDragPreview name={item.name} imageUrl={item.imageUrl} />;
      default:
        return <></>;
    }
  }, [itemType]);

  if (isDragging && !!sourceRef.current && !!previewOptionsRef.current && !!previewRef.current)
    previewOffsetRef.current = getDragPreviewOffSet(
      sourceRef.current,
      previewRef.current,
      clientOffSet!,
      initialCursorOffset!,
      initialSourceOffset!,
      previewOptionsRef.current!
    );

  return ReactDOM.createPortal(
    <div className={styles.dragLayer}>
      <div
        className={styles.previewContainer}
        ref={(el) => (previewRef.current = el as HTMLElement)}
        style={getCSSTranslate(previewOffsetRef.current)}
      >
        {renderPreview}
      </div>
    </div>,
    document.body
  );
};

export default memo(DragLayer);
