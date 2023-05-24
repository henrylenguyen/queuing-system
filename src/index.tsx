import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { StyledEngineProvider } from '@mui/material/styles'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyledEngineProvider>
  </Provider>
)

reportWebVitals()
