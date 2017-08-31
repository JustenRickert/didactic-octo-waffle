import {combineReducers} from "redux"

import nil from "./nil"
import character from './character'

const rootReducer = combineReducers({nil, character})

export default rootReducer
