import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './features/auth/provider/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import App from './app/App';
import { QueryClientProvider } from '@tanstack/react-query';
import { client } from './app/query/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <App/>
      </QueryClientProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>,
);
