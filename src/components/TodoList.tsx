import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void,
    addTask: (title: string) => void
};

const TodoList = (props: TodoListPropsType) => {
    const tasksElements = props.tasks.map((task: TaskType) => {
        const removeTask = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title} &nbsp;</span>
                <button onClick={removeTask}>&times;</button>
            </li>
        )
    });

    const [title, setTitle] = useState('');

    const onClickHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickHandler()
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter);

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyDown={onKeyDownInputHandler}/>
                <button onClick={onClickHandler}>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button onClick={onClickHandlerCreator('all')}>All</button>
                <button onClick={onClickHandlerCreator('active')}>Active</button>
                <button onClick={onClickHandlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;