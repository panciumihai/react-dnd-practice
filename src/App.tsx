import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.scss';
import { DndProvider, DropTargetMonitor, useDragDropManager } from 'react-dnd';
import CardsContainer from './components/CardsContainer/CardsContainer';
import DragLayer from './components/DragLayer/DragLayer';
import { useScroll } from './hooks/useDragScroll';

const CARDS_MOCK = [
  {
    id: '34',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/34.jpeg',
    name: 'Benjamin',
  },
  {
    id: '232',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/232.jpeg',
    name: 'Morty Smith',
  },
  {
    id: '236',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/236.jpeg',
    name: 'Mr. Beauregard',
  },
];

const CARDS_MOCK_2 = [
  {
    id: '45',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/45.jpeg',
    name: 'Test 45',
  },
  {
    id: '46',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/46.jpeg',
    name: 'Test 46',
  },
  {
    id: '47',
    imageUrl: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    name: 'Agent 47',
  },
];

interface NormalizedObjects<T> {
  byId: {
    [id: string]: T;
  };
  allIds: string[];
}

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

const CARDS = {
  byId: {
    '34': {
      id: '34',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/34.jpeg',
      name: 'Benjamin',
      containerId: '1',
    },
    '232': {
      id: '232',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/232.jpeg',
      name: 'Morty Smith',
    },
    '236': {
      id: '236',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/236.jpeg',
      name: 'Mr. Beauregard',
    },
    '45': {
      id: '45',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/45.jpeg',
      name: 'Test 45',
    },
    '46': {
      id: '46',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/46.jpeg',
      name: 'Test 46',
    },
    '47': {
      id: '47',
      imageUrl: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
      name: 'Agent 47',
    },
  },
  allIds: ['34', '232', '236', '45', '46', '47'],
} as NormalizedObjects<Card>;

const CONTAINERS = {
  byId: {
    '1': {
      id: '1',
      name: 'Container 1',
      cards: ['34', '232'],
    },
    '2': {
      id: '2',
      name: 'Container 2',
      cards: ['236'],
    },
    ['3']: {
      id: '3',
      name: 'Container 3',
      cards: ['45', '46'],
    },
    ['4']: {
      id: '4',
      name: 'Container 4',
      cards: [],
    },
    ['5']: {
      id: '5',
      name: 'Container 5',
      cards: [],
    },
    ['6']: {
      id: '6',
      name: 'Container 6',
      cards: [],
    },
    ['7']: {
      id: '7',
      name: 'Container 7',
      cards: ['47'],
    },
  },
  allIds: ['1', '2', '3', '4', '5', '6', '7'],
} as NormalizedObjects<Container>;

const CONTAINERS_MAP = {
  entities: {
    ['1']: {
      id: '1',
      name: 'Container 1',
      cards: [
        {
          id: '34',
          imageUrl: 'https://rickandmortyapi.com/api/character/avatar/34.jpeg',
          name: 'Benjamin',
        },
        {
          id: '232',
          imageUrl: 'https://rickandmortyapi.com/api/character/avatar/232.jpeg',
          name: 'Morty Smith',
        },
        {
          id: '236',
          imageUrl: 'https://rickandmortyapi.com/api/character/avatar/236.jpeg',
          name: 'Mr. Beauregard',
        },
      ],
    },
    ['2']: {
      id: '2',
      name: 'Container 2',
      cards: [],
    },
    ['3']: {
      id: '3',
      name: 'Container 3',
      cards: [
        {
          id: '45',
          imageUrl: 'https://rickandmortyapi.com/api/character/avatar/45.jpeg',
          name: 'Test 45',
        },
        {
          id: '46',
          imageUrl: 'https://rickandmortyapi.com/api/character/avatar/46.jpeg',
          name: 'Test 46',
        },
        {
          id: '47',
          imageUrl: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
          name: 'Agent 47',
        },
      ],
    },
  },
};

function App() {
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState(CARDS);
  const [containers, setContainers] = useState(CONTAINERS);

  const containerRef = useRef<HTMLDivElement>(null);
  // const { updatePosition } = useScroll();
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  // useLayoutEffect(() => {
  //   const unsubscribe = monitor.subscribeToOffsetChange(() => {
  //     const offset = monitor.getClientOffset()?.y as number;
  //     updatePosition({ position: offset, isScrollAllowed: monitor.isDragging() });
  //   });
  //   return unsubscribe;
  // }, [monitor, updatePosition]);

  const dropHandler = (containerId: string, item: any, monitor: DropTargetMonitor) => {
    console.log(containerId, item, monitor);
    // console.log(monitor.);
    // setContainers(prevState => {...prevState, prevState.byId[containerId].cards.push(item.id)});
    setContainers((prevState) => {
      const parentId = prevState.allIds.find((id) => prevState.byId[id].cards.includes(item.id));
      if (parentId)
        prevState.byId[parentId].cards = prevState.byId[parentId].cards.filter(
          (cardId) => cardId !== item.id
        );
      prevState.byId[containerId].cards.push(item.id);
      return prevState;
    });
  };

  const getContainerCards = (containerId: string) =>
    containers.byId[containerId].cards.map((cardId) => cards.byId[cardId]);

  // console.log(containers.allIds);
  return (
    <div className={styles.app} ref={containerRef}>
      {containers.allIds.map((id) => (
        <CardsContainer
          key={id}
          name={containers.byId[id].name}
          cards={getContainerCards(id)}
          onDrop={(item, monitor) => dropHandler(id, item, monitor)}
        ></CardsContainer>
      ))}
      <DragLayer key={'test'} />
    </div>
  );
}

export default App;
