import React from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from './CustomTouchBackend';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider
      backend={TouchBackend}
      options={{ enableMouseEvents: true, delayMouseStart: 20, delay: 20 }}
      debugMode={true}
    >
      <App />
    </DndProvider>
  </React.StrictMode>
);
