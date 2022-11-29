import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
    title: string,
    filter: FilterValuesType
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void,
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
};

const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addTask();
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

        error && setError(false);
    }

    const onClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter);

    const tasksElements = props.tasks.length ?
        <ul>{props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(task.id, event.currentTarget.checked)
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                    <span className={task.isDone ? 'task-done' : ''}>{task.title} &nbsp;</span>
                    <button onClick={removeTask}>&times;</button>
                </li>
            )
        })}</ul> : <span>List is empty!</span>;

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error-input' : ''}
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownInputHandler}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error'}>{'Please, enter task title!'}</div>}
            </div>

            {tasksElements}

            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('all')}>
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('active')}>
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('completed')}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;