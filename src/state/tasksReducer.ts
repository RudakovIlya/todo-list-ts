import {TasksType} from "../App";
import {addTodoListAC, removeTodoListAC} from "./todoListReducer";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: AllActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(stateItem => stateItem.id !== action.payload.taskID)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todoListID]: [{
                    id: v1(),
                    title: action.payload.newTitle,
                    isDone: false
                }, ...state[action.payload.todoListID]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(stateItem => stateItem.id === action.payload.taskID ? {
                    ...stateItem,
                    isDone: action.payload.isDone
                } : stateItem)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(stateItem => stateItem.id === action.payload.taskID ? {
                    ...stateItem,
                    title: action.payload.newTitle
                } : stateItem)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            const copy = {...state};
            delete copy[action.payload.todoListID]
            return copy
        default:
            return state
    }
}

type AllActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changTaskStatusAC>
    | ReturnType<typeof changTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            taskID
        }
    } as const
}

export const addTaskAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            newTitle
        }
    } as const
}

export const changTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskID,
            isDone
        }
    } as const
}

export const changTaskTitleAC = (todoListID: string, taskID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListID,
            taskID,
            newTitle
        }
    } as const
}

