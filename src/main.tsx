import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from './CustomTouchBackend';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Card from './components/Card/Card';
import DragLayer from './components/DragLayer/DragLayer';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider
      backend={TouchBackend}
      options={{ enableTouchEvents: true, enableMouseEvents: true }}
      debugMode={true}
    >
      <App />
      <DragLayer />
    </DndProvider>
    <Card
      id={'card.id'}
      imageUrl={'card.imageUrl'}
      name={'card.name'}
      onClick={() => console.log('click on not draggable card')}
    ></Card>
  </React.StrictMode>
);
