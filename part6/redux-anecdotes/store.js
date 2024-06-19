import { configureStore } from "@reduxjs/toolkit"

import anecdoteReducer from "./src/reducers/anecdoteReducer"
import filterReducer from './src/reducers/filterReducer'

export const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})

console.log(store.getState())