import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.scss';
import { DndProvider, DropTargetMonitor, useDragDropManager } from 'react-dnd';
import CardsContainer from './components/CardsContainer/CardsContainer';
import DragLayer from './components/DragLayer/DragLayer';
import { useScroll } from './hooks/useScroll';

interface Container {
  id: string;
  name: string;
  cards: string[];
}

interface Card {
  id: string;
  imageUrl: string;
  name: string;
}

const CONTAINERS = [
  {
    id: '1',
    name: 'Container 1',
  },
  {
    id: '2',
    name: 'Container 2',
  },
  {
    id: '3',
    name: 'Container 3',
  },
  {
    id: '4',
    name: 'Container 4',
  },
  {
    id: '5',
    name: 'Container 5',
  },
  {
    id: '6',
    name: 'Container 6',
  },
  {
    id: '7',
    name: 'Container 7',
  },
];

const CARDS = [
  {
    id: '34',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/34.jpeg',
    name: 'Benjamin',
    containerId: '1',
  },
  {
    id: '232',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/232.jpeg',
    name: 'Morty Smith',
    containerId: '1',
  },
  {
    id: '236',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/236.jpeg',
    name: 'Mr. Beauregard',
    containerId: '3',
  },
  {
    id: '45',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/45.jpeg',
    name: 'Test 45',
    containerId: '3',
  },
  {
    id: '46',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/46.jpeg',
    name: 'Test 46',
    containerId: '4',
  },
  {
    id: '47',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    name: 'Agent 47',
    containerId: '6',
  },
];

function App() {
  const [cards, setCards] = useState(CARDS);
  const [containers, setContainers] = useState(CONTAINERS);

  const containerRef = useRef<HTMLDivElement>(null);
  const { updatePosition } = useScroll(); // put the container ref here if you want to scroll it
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();
  useLayoutEffect(() => {
    const unsubscribe = monitor.subscribeToOffsetChange(() => {
      const offset = monitor.getClientOffset()?.y as number;
      updatePosition({ position: offset, isScrollAllowed: monitor.isDragging() });
    });
    return unsubscribe;
  }, [monitor, updatePosition]);

  const dropHandler = (containerId: string, item: any, monitor: DropTargetMonitor) => {
    console.log(containerId, item, monitor);

    let newCards = [...cards];
    const element = newCards.find((c) => c.id === item.id);
    if (element) {
      element.containerId = containerId;
    }
    setCards(newCards);
  };

  const getContainerCards = (containerId: string) =>
    cards.filter((card) => card.containerId === containerId);

  return (
    <div className={styles.app}>
      {containers.map(({ id, name }) => (
        <CardsContainer
          key={id}
          name={name}
          cards={getContainerCards(id)}
          onDrop={(item, monitor) => dropHandler(id, item, monitor)}
        ></CardsContainer>
      ))}
    </div>
  );
}

export default App;
