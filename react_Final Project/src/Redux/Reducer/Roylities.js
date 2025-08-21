import {  RoylitiesADDAPI, RoylitiesGETAPI } from "../Type/Type"

export const RoylitiesApireducer = (state = [], action) => {
    switch (action.type) {
        case RoylitiesGETAPI:
            return action.data
        case RoylitiesADDAPI:
            return action.data
        default:
            return state
    }

}