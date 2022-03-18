import {combineReducers} from 'redux'
import doorReducer from './doorReducer'
import userReducer from './userReducer'
import histReducer from './histReducer'
import tableAdminReducer from './tableAdminReducer'

export default combineReducers({
    session:userReducer,
    door:doorReducer,
    hist:histReducer,
    table:tableAdminReducer
})