import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import styles from './CardDragPreview.module.scss';

interface CardDragPreviewProps {
  style?: CSSProperties;
  name: string;
  imageUrl: string;
}

const CardDragPreview = React.forwardRef<HTMLDivElement, CardDragPreviewProps>((props, ref) => {
  const { style, name, imageUrl } = props;
  return (
    <div ref={ref} className={classNames(styles.container, styles.card)} style={style}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={name}></img>
      </div>
      <div className={styles.nameContainer}>
        <h3>{name}</h3>
      </div>
    </div>
  );
});

export default CardDragPreview;
