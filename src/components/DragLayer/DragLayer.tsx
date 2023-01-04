import { CSSProperties } from 'react';
import { useDragDropManager, useDragLayer, XYCoord } from 'react-dnd';
import CardDragPreview from '../CardDragPreview/CardDragPreview';

const getItemStyles = (
  initialCursorOffset: XYCoord | null,
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) => {
  if (!initialOffset || !currentOffset || !initialCursorOffset) {
    return {
      display: 'none',
    };
  }

  const x = initialCursorOffset?.x + (currentOffset.x - initialOffset.x) + 5;
  const y = initialCursorOffset?.y + (currentOffset.y - initialOffset.y) + 5;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
    // position: 'fixed',
    // top: '0',
    // left: '0',
    // zIndex: 999,
  } as CSSProperties;
};

interface DragLayerProps {}

const DragLayer = (props: DragLayerProps) => {
  const {} = props;
  const {
    item,
    itemType,
    isDragging,
    initialCursorOffset,
    initialSourceOffset,
    currentSourceOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialCursorOffset: monitor.getInitialClientOffset(),
    initialSourceOffset: monitor.getInitialSourceClientOffset(),
    currentSourceOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (isDragging) {
    document.body.style.cursor = 'not-allowed';
    // console.log('not allowed');
  } else {
    document.body.style.cursor = 'default';
  }

  let previewItem = <h3>No dragging things</h3>;
  if (itemType === 'CARD') {
    previewItem = (
      <CardDragPreview
        style={getItemStyles(initialCursorOffset, initialSourceOffset, currentSourceOffset)}
        name={item.name}
        imageUrl={item.imageUrl}
      />
    );
  }

  return previewItem;
};

export default DragLayer;
