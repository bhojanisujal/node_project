import { ALBUM_ADDAPI, ALBUM_GETAPI } from "../Type/Type"


export const ALBUMApireducer = (state = [], action) => {
    switch (action.type) {
        case ALBUM_ADDAPI:
            return action.data
        case ALBUM_GETAPI:
            return action.data
        default:
            return state
    }

}