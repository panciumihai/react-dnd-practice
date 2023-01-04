import classNames from 'classnames';
import React, { FC, useEffect, memo } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { BasicProps } from '../../types';
import CardDragPreview from '../CardDragPreview/CardDragPreview';

import styles from './Card.module.scss';

interface CardProps extends BasicProps {
  id: string;
  imageUrl?: string;
  name: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = memo((props) => {
  const { className, id, imageUrl, name, onClick } = props;

  const [collected, dragRef, dragPreviewRef] = useDrag({
    type: 'CARD',
    item: { id, name, imageUrl },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getClientOffset(),
    }),
  });

  // useEffect(() => {
  //   dragPreviewRef(null);
  // }, []);

  return (
    <div
      className={classNames(
        styles.container,
        styles.card,
        { [styles.dragging]: collected.isDragging },
        className
      )}
      ref={dragRef}
      onClick={onClick}
    >
      <div className={styles.imageContainer} ref={(el) => dragPreviewRef(el, { anchorX: 1 })}>
        <img src={imageUrl} alt={name}></img>
      </div>
      <div className={styles.nameContainer} onClick={onClick}>
        <h3>{name}</h3>
      </div>
    </div>
  );
});

export default Card;
