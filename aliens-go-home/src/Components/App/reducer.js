import {consts} from "./actions";
import {moveObjects} from "../../utils/functions";

const initialState = {
    angle: 45,
}

function reducer(state = initialState, action){
    switch(action.type) {
        case consts.MOVE_OBJECTS:
            return moveObjects(state, action);
        default:
            return state;
    }
}

export default reducer;