import type { DragDropManager } from 'dnd-core';
import { CSSProperties } from 'react';
import { DragPreviewOptions, XYCoord } from 'react-dnd';
/* 
This function will return the HTMLElement of the current dragging element.
It is an react-dnd library helper.
*/
export const getCurrentSourceNode = (dragDropManager: DragDropManager): HTMLElement | undefined => {
  const sourceId = dragDropManager.getMonitor().getSourceId();
  if (!sourceId) return;

  const dragSource = dragDropManager.getRegistry().getSource(sourceId) as any;
  return dragSource.connector.dragSourceNode;
};

/*
This function will retrieve the preview options of the current dragging item.
This information is sent by a useDrag hook.

Example
    useDrag({
        type: 'CARD',
        item: { ...some item info },
        previewOptions: {
          anchorX: 0,
          anchorY: 0,
          offsetX: 20,
          offsetX, 20
        }
        collect: (monitor: DragSourceMonitor) => ({
          ...
        }),
      })
For the previous example we will replace de default values with the previewOptions values.
*/
export function getCurrentSourcePreviewNodeOptions(
  dragDropManager: DragDropManager
): DragPreviewOptions {
  const sourceId = dragDropManager.getMonitor().getSourceId();
  let sourcePreviewNodeOptions: DragPreviewOptions = {};
  if (sourceId) {
    const dragSource = dragDropManager.getRegistry().getSource(sourceId) as any;
    sourcePreviewNodeOptions = dragSource.spec.previewOptions;
  }

  return {
    anchorX: 0.5,
    anchorY: 0.5,
    offsetX: 0,
    offsetY: 0,
    captureDraggingState: false,
    ...(sourcePreviewNodeOptions || {}),
  };
}

/*
This function will return the XY coordinates of the drag preview using values from previewOptions.
By default it will keep de grab position as anchor.

Example:
    useDrag({
        type: 'CARD',
        item: { ...some item info },
        previewOptions: {
          anchorX: 1,
          anchorY: 1,
          offsetX: -50,
          offsetX, -20
        }
        collect: (monitor: DragSourceMonitor) => ({
          ...
        }),
      })
For the preview example the drag preview will have the anchor in the right bottom 
corner with an offset of 50px on X axis and 20px on Y axis.

Important: 0.5 value will keep the grab location. if you want to anchor the drag preview to center
we have to set anchorX and anchorY to 0.49.
*/
export function getDragPreviewOffSet(
  sourceNode: HTMLElement,
  dragPreview: HTMLElement,
  clientOffset: XYCoord,
  initialCursorOffset: XYCoord,
  initialOffset: XYCoord,
  previewOptions: DragPreviewOptions
): XYCoord {
  const { offsetWidth: sourceWidth, offsetHeight: sourceHeight } = sourceNode;
  const { offsetWidth: dragPreviewWidth, offsetHeight: dragPreviewHeight } = dragPreview;
  const { anchorX, anchorY, offsetX, offsetY } = previewOptions;

  const sourceGrabOffset = {
    x: initialCursorOffset.x - initialOffset.x,
    y: initialCursorOffset.y - initialOffset.y,
  };

  // This part will convert the drag point from the source element to same location
  // for the dragging preview. This is useful when you have different width and height
  // between drag source and preview item
  const previewGrabOffset = {
    x: (sourceGrabOffset.x / sourceWidth) * dragPreviewWidth,
    y: (sourceGrabOffset.y / sourceHeight) * dragPreviewHeight,
  };

  let x = clientOffset.x - previewGrabOffset.x;
  let y = clientOffset.y - previewGrabOffset.y;

  if (anchorX !== undefined && anchorX !== 0.5) x = -dragPreviewWidth * anchorX + clientOffset.x;
  if (anchorY !== undefined && anchorY !== 0.5) y = -dragPreviewHeight * anchorY + clientOffset.y;

  if (offsetX !== undefined && offsetX !== 0) x += offsetX;
  if (offsetY !== undefined && offsetY !== 0) y += offsetY;

  return { x, y };
}

/*
  This function converts XY coordinates to CSS style
  Example:
  for X: 20 and Y:100 the generated output will be transform: translate(20px, 100px)
*/
export const getCSSTranslate = (currentOffset: XYCoord | null) => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  } as CSSProperties;
};
