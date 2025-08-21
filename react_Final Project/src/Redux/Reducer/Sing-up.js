import { ADDAPI, GETAPI } from "../Type/Type"

export const Apireducer = (stste = [],action)=>{
    switch(action.type){
        case ADDAPI:
            return action.data
            case GETAPI:
                console.log(action.data)
                return action.data
                default:
                    return stste
    }

}