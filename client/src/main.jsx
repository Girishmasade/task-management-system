import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import { store } from './redux/store/store.js';
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AppContextProvider>
  <Provider store={store}>
      <App />
  </Provider>
    </AppContextProvider>
  </BrowserRouter>
);
