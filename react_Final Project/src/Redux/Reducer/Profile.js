import {  PROFILEADDAPI, PROFILEGETAPI } from "../Type/Type"

export const ProfileApireducer = (state = [], action) => {
    switch (action.type) {
        case PROFILEADDAPI:
            return action.data
        case PROFILEGETAPI:
            return action.data
        default:
            return state
    }

}