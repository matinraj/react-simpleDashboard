import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './styles/theme';

import { ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} preventDuplicate>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <App />
            </Router>
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
