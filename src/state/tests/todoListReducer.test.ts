import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../../App";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "../todoListReducer";

test('correct todolist should be removed', () => {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const initialState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ];

    const endState = todoListReducer(initialState, removeTodoListAC(todoListID1));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)

})

test('correct todolist should be added', () => {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const initialState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ];

    const newTodolistTitle = 'New Todo Title';

    const endState = todoListReducer(initialState, addTodoListAC(newTodolistTitle));

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)

});

test('correct todolist should change its name', () => {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const initialState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ];

    const newTodolistTitle = 'New Todo Title';

    const endState = todoListReducer(initialState, changeTodoListTitleAC(todoListID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');

    expect(endState[1].title).toBe(newTodolistTitle);

});

test('correct filter of todolist should be changed', () => {
    const todoListID1 = v1();
    const todoListID2 = v1();

    const initialState: TodoListsType[] = [
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ];

    const newFilter: FilterValuesType = 'completed';

    const endState = todoListReducer(initialState, changeTodoListFilterAC(todoListID2, newFilter));
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe(newFilter)
})