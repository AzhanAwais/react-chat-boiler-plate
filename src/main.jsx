import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/scss/styles.css"
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { HMSRoomProvider } from "@100mslive/react-sdk";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HMSRoomProvider>
        <App />
        <ToastContainer />
      </HMSRoomProvider>
    </Provider>
  </React.StrictMode>,
)
