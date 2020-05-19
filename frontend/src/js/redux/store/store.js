import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'

let store = createStore(rootReducer)

window.store = store
export default store
