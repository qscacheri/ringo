import 
{
    NEW_OBJECT,
    NEW_CONNECTION,
    OBJECT_CHANGED,
    ADD_OBJECT,
    OBJECT_TYPE_CHANGED,
    ADD_PATCH_CABLE
} from "../constants/action-types.js";
import { OBJECT_CONFIGS } from "../constants/object-configs.js";
import { OBJECT_TYPES } from "../constants/object-types.js";

const initialState = {
    objects: {},
    patchCableData: {
        activePatchCableId: -1,
        patchCables: {}
    }

};

function rootReducer(state = initialState, action) {   
    const payload = action.payload;
 
    if (action.type === ADD_OBJECT) {    
         
        return {
            ...state, 
            objects: {
                ...state.objects, [action.payload.id]: action.payload
            }
        }
    }

    if (action.type === OBJECT_TYPE_CHANGED)
    {

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

    if (action.type === ADD_PATCH_CABLE)
    {
        var newPatchCable = payload;
        return {
            ...state, 
            patchCableData: {
                activePatchCableId: state.patchCableData.activePatchCableId,
                patchCables: 
                {
                    ...state.patchCableData.patchCables, [action.payload.id]: newPatchCable
                }
            }
        }
    }
    return state;
}
export default rootReducer;
