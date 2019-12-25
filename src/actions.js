/*
 * action types
 */
export const ADD_CABLE = 'ADD_CABLE'


/*
 * action creators
 */
 export function addCable(text) {
   return { type: ADD_CABLE, text }
 }
