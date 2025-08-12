import { combineReducers } from "redux";
import { Apireducer } from "./Sing-up";
import { ALBUMApireducer } from "./Album";
import { ProfileApireducer } from "./Profile";
import { RoylitiesApireducer } from "./Roylities";
import { passWordApireducer } from "./Password";

export const RootReduser = combineReducers({

    Apireducer:Apireducer,
    ALBUMApireducer:ALBUMApireducer,
    profileApireducer:ProfileApireducer,
    RoylitiesApireducer:RoylitiesApireducer,
    passWordApireducer:passWordApireducer
    
})