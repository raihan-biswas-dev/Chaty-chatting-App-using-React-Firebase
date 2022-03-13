import { combineReducers } from "redux";
import * as actionType from "../actions/type";


const initialstate = {
    currentUser: null,
    isLoading: true,
}

// User Reducers 

const user_reducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }

        case actionType.CLEAR_USER:
            return {
                ...initialstate
            }

        default:
            return state
    }
}


// Group reducers

const initialstateGroup = {
    currentGroup: null,
}

const group_reducers = (state = initialstateGroup, action) => {
    switch (action.type) {
        case actionType.SET_CURRENT_GROUP:
            return {
                ...state,
                currentGroup: action.payload.currentGroup
            }
            default:
                return state
    }
}




export const rootReducers = combineReducers({
    user: user_reducer,
    group :group_reducers
})