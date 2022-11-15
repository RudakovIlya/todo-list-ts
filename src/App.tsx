import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const todoListTitle: string = 'What to learn';
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: 1, title: 'HTML & CSS', isDone: true,
        },
        {
            id: 2, title: 'JS', isDone: true,
        },
        {
            id: 3, title: 'React', isDone: false,
        },
        {
            id: 4, title: 'TypeScript', isDone: false,
        },
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue);
    };


    const filterTasks = (filter: FilterValuesType, tasks: Array<TaskType>): Array<TaskType> => {
        if (filter === 'active') {
            return tasks.filter(t => t.isDone)
        } else if (filter === 'completed') {
            return tasks.filter(t => !t.isDone)
        }
        return tasks;
    }

    const removeTask = (taskId: number) => {
        const updateTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updateTasks);
    };

    const filteredTasks = filterTasks(filter, tasks);

    return (
        <div className="App">
            <TodoList changeTodoListFilter={changeTodoListFilter} removeTask={removeTask} tasks={filteredTasks}
                      title={todoListTitle}/>
        </div>
    );
}

export default App;
