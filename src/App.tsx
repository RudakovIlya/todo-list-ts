import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const todoListTitle: string = 'What to learn';
    const [tasks, setTasks] = useState<TaskType[]>([
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
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue);
    };

    const filterTasks = (filter: FilterValuesType, tasks: TaskType[]): TaskType[] => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => !t.isDone)
            case 'active':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const removeTask = (taskId: string) => {
        const updateTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updateTasks);
    };

    const filteredTasks = filterTasks(filter, tasks);

    const addTask = (title: string) => {
        setTasks([...tasks, {id: v1(), title, isDone: false}])
    }

    return (
        <div className="App">
            <TodoList
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}
                removeTask={removeTask}
                tasks={filteredTasks}
                title={todoListTitle}/>
        </div>
    );
}

export default App;
