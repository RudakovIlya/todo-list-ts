import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

export const todoListReducer = (state: TodoListsType[], action: AllActionsType): TodoListsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(stateItem => stateItem.id !== action.payload.todoListID)
        case "ADD-TODOLIST":
            return [{id: action.payload.todoListID, title: action.payload.newTitle, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(stateItem => stateItem.id === action.payload.todoListID ? {
                ...stateItem,
                title: action.payload.newTitle
            } : stateItem)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(stateItem => stateItem.id === action.payload.todoListID ? {
                ...stateItem,
                filter: action.payload.filter
            } : stateItem)
        default:
            return state
    }
}

type AllActionsType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListID
        }
    } as const
}

export const addTodoListAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle,
            todoListID: v1()
        }
    } as const
}

export const changeTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListID,
            newTitle
        }
    } as const
}

export const changeTodoListFilterAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListID,
            filter
        }
    } as const
}