import 
{
    NEW_OBJECT,
    NEW_CONNECTION,
    OBJECT_CHANGED,
    ADD_OBJECT,
    OBJECT_TYPE_CHANGED
} from "../constants/action-types.js";
import { OBJECT_CONFIGS } from "../constants/object-configs.js";
import { OBJECT_TYPES } from "../constants/object-types.js";

const initialState = {
    objects: {},
    patchCables: {}
};

function rootReducer(state = initialState, action) {    
    if (action.type === ADD_OBJECT) {    
         
        return {
            ...state, 
            objects: {
                ...state.objects, [action.payload.id]: action.payload
            }
        }
        console.log(state);        
        return state;
    }

    if (action.type === OBJECT_TYPE_CHANGED)
    {
        const payload = action.payload;

        var newObject = OBJECT_CONFIGS[payload.newObjectType]; 
        newObject.id = payload.id;
        newObject.position = state.objects[payload.id].position;
        console.log(state.objects[payload.id]);

        
        console.log(newObject);
        
        return {
            ...state, 
            objects: {
                ...state.objects, [action.payload.id]: newObject
            }
        }
    }
    return state;
}
export default rootReducer;
