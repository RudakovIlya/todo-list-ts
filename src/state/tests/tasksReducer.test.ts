import {v1} from "uuid";
import {TasksType} from "../../App";
import {addTodoListAC, removeTodoListAC} from "../todoListReducer";
import {addTaskAC, changTaskStatusAC, changTaskTitleAC, removeTaskAC, tasksReducer} from "../tasksReducer";

let todoListID1: string;
let todoListID2: string;
let taskID: string;
let initialState: TasksType;

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    taskID = '2'
    initialState = {
        [todoListID1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ],
    }
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(initialState, removeTaskAC(todoListID2, taskID));

    expect(endState).toEqual({
        [todoListID1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
    expect(endState[todoListID2].length).toBe(2);
})

test('correct task should be added to correct array', () => {

    const newTitle: string = 'New Title';

    const endState = tasksReducer(initialState, addTaskAC(todoListID2, newTitle))

    expect(endState[todoListID1].length).toBe(3);
    expect(endState[todoListID2].length).toBe(4)
    expect(endState[todoListID2][0].id).toBeDefined()
    expect(endState[todoListID2][0].title).toBe(newTitle)
    expect(endState[todoListID2][0].isDone).toBeFalsy()

})

test('status of specified task should be changed', () => {

    const isDone: boolean = true;

    const endState = tasksReducer(initialState, changTaskStatusAC(todoListID1, taskID, isDone))

    expect(endState[todoListID1][1].isDone).toBeTruthy()
    expect(endState[todoListID1]).toEqual([
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
    ])

})

test('correct task title should be update', () => {

    const newTitle: string = 'New Title';

    const endState = tasksReducer(initialState, changTaskTitleAC(todoListID2, taskID, newTitle))

    expect(endState[todoListID2][1].title).toBe(newTitle)
    expect(endState[todoListID2].length).toBe(3)
    expect(endState[todoListID2][0].isDone).toBeFalsy()
    expect(endState[todoListID2][1].id).toBe(taskID)
    expect(endState[todoListID2]).toEqual([
        {id: '1', title: 'bread', isDone: false},
        {id: '2', title: newTitle, isDone: true},
        {id: '3', title: 'tea', isDone: false}
    ])

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, addTodoListAC('Todo Title'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2') // проверка на существование нового id
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC(todoListID2);
    const endState = tasksReducer(initialState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todoListID2]).toBeUndefined();
});




