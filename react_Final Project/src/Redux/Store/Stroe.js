import { applyMiddleware, createStore } from "redux";
import { RootReduser } from "../Reducer/Rooot";
import { thunk } from "redux-thunk";

export const store =createStore(RootReduser,applyMiddleware(thunk))