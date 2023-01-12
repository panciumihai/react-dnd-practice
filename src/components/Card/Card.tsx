import classNames from 'classnames';
import React, { FC, useEffect, memo, useRef, useLayoutEffect } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { BasicProps } from '../../types';
import CardDragPreview from '../drag/Previews/CardDragPreview/CardDragPreview';

import styles from './Card.module.scss';

interface CardProps extends BasicProps {
  id: string;
  imageUrl?: string;
  name: string;
  isDraggable?: boolean;
  onClick?: () => void;
}

// const initializeDrag = (item: any) => {
//   const [collected, dragRef] = useDrag({
//     type: 'CARD',
//     item: item,
//     collect: (monitor: DragSourceMonitor) => ({
//       isDragging: monitor.isDragging(),
//       currentOffset: monitor.getClientOffset(),
//     }),
//   });
//   return [collected, dragRef];
// };

const Card: FC<CardProps> = (props) => {
  const { className, id, imageUrl, name, isDraggable = false, onClick } = props;

  const cardRef = useRef<HTMLDivElement>(null);

  const [collected, dragRef, previewRef] = isDraggable
    ? useDrag({
        type: 'CARD',
        item: { id, name, imageUrl },
        collect: (monitor: DragSourceMonitor) => ({
          isDragging: monitor.isDragging(),
          currentOffset: monitor.getClientOffset(),
        }),
      })
    : [];

  return (
    <div
      className={classNames(
        styles.container,
        styles.card,
        { [styles.dragging]: collected?.isDragging },
        className
      )}
      ref={dragRef}
      // draggable='false'
      onClick={onClick}
    >
      <div className={styles.imageContainer} ref={previewRef}>
        <img src={imageUrl} alt={name}></img>
      </div>
      <div className={styles.nameContainer} onClick={onClick}>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Card;
