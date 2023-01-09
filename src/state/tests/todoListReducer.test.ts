import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "../todoListReducer";

let initialState: TodoListsType[];
let todoListID1: string;
let todoListID2: string;

beforeEach(() => {
    todoListID1 = v1();
    todoListID2 = v1();

    initialState = [
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ];
})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(initialState, removeTodoListAC(todoListID1));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {

    const newTodolistTitle = 'New Todo Title';

    const endState = todoListReducer(initialState, addTodoListAC(newTodolistTitle));

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)

});

test('correct todolist should change its name', () => {

    const newTodolistTitle = 'New Todo Title';

    const endState = todoListReducer(initialState, changeTodoListTitleAC(todoListID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');

    expect(endState[1].title).toBe(newTodolistTitle);

});

test('correct filter of todolist should be changed', () => {

    const newFilter: FilterValuesType = 'completed';

    const endState = todoListReducer(initialState, changeTodoListFilterAC(todoListID2, newFilter));
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe(newFilter)

})