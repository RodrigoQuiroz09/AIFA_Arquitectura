import React from 'react'
import  ReactDOM  from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import App from './App'
import reducers from './reducers'
import thunk from 'redux-thunk'

const store = createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(

    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
        ,
    document.querySelector('#root')

)