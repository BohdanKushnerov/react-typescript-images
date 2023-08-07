import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './components/App';
import { MyGlobalStyles } from 'globalStyles/GlobalStyles.styled';
import { App } from 'components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MyGlobalStyles />
    <App />
  </React.StrictMode>
);
