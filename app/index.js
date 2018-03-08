import React             from 'react'
import ReactDOM          from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// Store //
import { Provider }      from 'react-redux'
import configureStore    from './store'
// Components //
import App               from "@/app/components/app.js"

const store = configureStore()
const supportsHistory = "pushState" in window.history

require("@/app/assets/css/app.scss")

if (typeof window !== 'undefined') {
  ReactDOM.render (
    <Provider store={store}>
      <BrowserRouter basename={process.env.BASE_URL} forceRefresh={!supportsHistory}>
          <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
}