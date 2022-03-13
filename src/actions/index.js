import * as actionType from "./type";

export const setuser = (user) => {
    return {
        type: actionType.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearuser = () => {
    return {
        type: actionType.CLEAR_USER
    }
}

export const setCurrentGroup = (group) => {
    return {
        type: actionType.SET_CURRENT_GROUP,
        payload: {
            currentGroup: group
        }
    }
}