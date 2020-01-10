import { ADD_CABLE } from './actions.js'
import { addCable } from "./actions.js"

function quaxApp(state, action) {
  if (typeof state === 'undefined') {
      // console.log("is undefined");
    return {objects: {}}
  }

  switch (action.type) {
  case ADD_CABLE:
        return Object.assign({}, state);
  default:
    return state
    }
}

export default quaxApp
