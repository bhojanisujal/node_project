import { Pass } from "../Type/Type"



export const passWordApireducer = (state = [], action) => {
    switch (action.type) {
        case Pass:
            return action.data
    
        default:
            return state
    }

}