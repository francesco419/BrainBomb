import React from 'react';
import './index.scss';
import App from './App';
import { createRoot } from 'react-dom/client';

//---redux----
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

const persistor = persistStore(store);
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
