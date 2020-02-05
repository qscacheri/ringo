import 
{
    ADD_OBJECT,
    OBJECT_TYPE_CHANGED,
    ADD_PATCH_CABLE,
    REMOVE_PATCH_CABLE
} from "../constants/action-types.js";
import { OBJECT_CONFIGS } from "../constants/object-configs.js";

const initialState = {
    objects: {},
    patchCableData: {
        activePatchCable: 
        {
            id: -1,
            neededConnectionType: -1,
            objectId: -1
        },
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
        
        return {
            ...state, 
            objects: {
                ...state.objects, [action.payload.id]: newObject
            }
        }
    }

    if (action.type === ADD_PATCH_CABLE)
    {
        console.log(payload);
        var activePatchCable = state.patchCableData.activePatchCable;
        activePatchCable.id = payload.id;
        var newPatchCable = payload;
        return {
            ...state, 
            patchCableData: {
                activePatchCable: activePatchCable,
                patchCables: 
                {
                    ...state.patchCableData.patchCables, [action.payload.id]: newPatchCable
                }
            }
        }
    }

    if (action.type === REMOVE_PATCH_CABLE)
    {

        var id = payload.id;
        var newPatchCableData = Object.assign({}, state.patchCableData);
        
        delete newPatchCableData.patchCables[id];
        var activePatchCable = state.patchCableData.activePatchCable;
        activePatchCable.id = -1;
        return {
            ...state, 
            patchCableData: {
                activePatchCable: activePatchCable,
                patchCables:  newPatchCableData.patchCables
            }
        }


    }
    return state;
}
export default rootReducer;
