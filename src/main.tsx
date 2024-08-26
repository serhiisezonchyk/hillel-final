import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './store/index.ts';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </HelmetProvider>,
);
