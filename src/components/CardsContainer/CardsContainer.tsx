import classNames from 'classnames';
import { BasicProps } from '../../types';
import Card from '../Card/Card';

import { DropTargetMonitor, useDrop } from 'react-dnd';

import styles from './CardsContainer.module.scss';
import { CSSProperties, useEffect, useState } from 'react';

interface CardsContainerProps extends BasicProps {
  name?: string;
  style?: CSSProperties;
  cards?: { id: string; imageUrl: string; name: string }[];
  onChange?: (cards: { id: string; imageUrl: string; name: string }[]) => void;
  onDrop?: (item: any, monitor: DropTargetMonitor) => void;
}

const CardsContainer = (props: CardsContainerProps) => {
  const { style, cards, name, onChange, onDrop } = props;
  const [collected, drop] = useDrop(
    {
      accept: ['CARD'],
      canDrop: (item: any, monitor) => {
        return !cards || cards?.filter((c) => c.id === item.id).length === 0;
      },
      // end: DragAndDropStrategies.timelineCards.onDrop,
      drop: onDrop,
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        isDragging: monitor.getItemType() !== null,
      }),
    },
    [cards]
  );

  // if (collected.isDragging) document.body.style.cursor = 'default';

  // if (!collected.canDrop && collected.isOver) {
  //   document.body.style.cursor = 'not-allowed';
  //   console.log("can't drop here");
  // }

  return (
    <div
      className={classNames(styles.container, { [styles.dragOver]: collected.isOver })}
      style={{
        cursor: collected.isOver ? 'default' : 'inherit',
        backgroundColor:
          !collected.canDrop && collected.isOver
            ? 'red'
            : collected.canDrop && collected.isOver
            ? 'green'
            : '',
        ...style,
      }}
      // ref={cardsContainerRef}
    >
      <h2>{name}</h2>
      <div className={styles.cards} ref={drop} data-handler-id={collected.handlerId}>
        {cards &&
          cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              imageUrl={card.imageUrl}
              name={card.name}
              onClick={() => console.log(card.id, card.name)}
              // onDragStarted={() => setDraggedCard(card)}
            />
          ))}
      </div>
    </div>
  );
};

export default CardsContainer;
