import {tasksReducer} from "../tasksReducer";
import {addTodoListAC, todoListReducer} from "../todoListReducer";
import {TasksType, TodoListsType} from "../../App";

test('ids should be equals', () => {

    const startTasksState: TasksType = {};
    const startTodoListsState: TodoListsType[] = [];

    const action = addTodoListAC("new todolist");
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoListID);
    expect(idFromTodoLists).toBe(action.payload.todoListID);
});
