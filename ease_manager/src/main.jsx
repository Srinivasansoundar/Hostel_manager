import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store,persistor} from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
// import { DataProvider } from './Datacontext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(

  <PersistGate persistor={persistor}>
    <Provider store={store}>
    {/* <DataProvider> */}
      <App />
      {/* </DataProvider> */}
    </Provider>
    
  </PersistGate>
  
)
