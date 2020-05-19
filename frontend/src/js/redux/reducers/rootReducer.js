const initialState = {
  objects: {},
  patchCables: {},
  activePatchCableID: -1
}


function rootReducer(state, action) {
  const payload = action.payload

  if (typeof state === 'undefined') {
    return initialState
  }

  if (action.type === 'NEW_OBJECT') {
    return {
      ...state,
      objects: { ...state.objects, [payload.id]: payload }
    }
  }

  if (action.type === 'OBJECT_MOVED') {
    return {
      ...state,
      objects: {
        ...state.objects, [payload.id]: {
          ...state.objects[payload.id], position: { x: payload.x, y: payload.y }
        }
      }
    }
  }

  if (action.type === 'DELETE_OBJECT') {
    const objects = Object.assign({}, state.objects)
    delete objects[payload.id]
    return {
      ...state,
      objects
    }
  }

  if (action.type === 'PATCH_CABLE_GRABBED') {
    return {
      ...state,
      activePatchCableID: payload.id
    }
  }

  if (action.type === 'PATCH_CABLE_RELEASED') {
    return {
      ...state,
      activePatchCableID: -1
    }
  }

  return state
}

export default rootReducer