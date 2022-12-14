import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ]);

    const [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
            {
                id: v1(), title: 'HTML & CSS', isDone: true,
            },
            {
                id: v1(), title: 'JS', isDone: true,
            },
            {
                id: v1(), title: 'React', isDone: false,
            },
            {
                id: v1(), title: 'TypeScript', isDone: false,
            },
        ],
        [todoListID2]: [
            {
                id: v1(), title: 'HTML & CSS', isDone: true,
            },
            {
                id: v1(), title: 'JS', isDone: true,
            },
            {
                id: v1(), title: 'React', isDone: false,
            },
            {
                id: v1(), title: 'TypeScript', isDone: false,
            },
        ],
    });

    const removeTask = (todoListID: string, taskId: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)});
    };

    const addTask = (todoListID: string, title: string) => {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], {id: v1(), title, isDone: false}]})
    }

    const changeTodoListFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map((todoList) => todoList.id === todoListID ? {...todoList, filter} : todoList))
    };

    const getFilteredTasks = (filter: FilterValuesType, tasks: TaskType[]): TaskType[] => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case 'active':
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const changeStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, isDone} : task)
        });
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todoListID))
    }

    const todoListsItem = todoLists.map(todoList => {
        const filteredTasks = getFilteredTasks(todoList.filter, tasks[todoList.id])
        return (
            <TodoList
                todoListID={todoList.id}
                key={todoList.id}
                title={todoList.title}
                filter={todoList.filter}
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}
                removeTask={removeTask}
                tasks={filteredTasks}
                changeStatus={changeStatus}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className="App">
            {todoListsItem}
        </div>
    );
}

export default App;
