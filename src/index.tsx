import React from 'react';
import ReactDOM from 'react-dom/client';
import {App, Test} from './App';
import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* enable below to test */}
    {/* <Test /> */}

    {/* disable above and enable below to demo */}
    <App />
  </React.StrictMode>
);

reportWebVitals();
