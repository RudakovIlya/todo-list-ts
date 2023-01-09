import {createStore, combineReducers, compose} from "redux";
import {todoListReducer} from "./todoListReducer";
import {tasksReducer} from "./tasksReducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch;