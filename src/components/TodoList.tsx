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

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const {title, tasks, filter, removeTask, changeTodoListFilter, addTask, changeStatus} = props

    const [titleTask, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addTaskCallback = () => {
        const trimmedTitle = titleTask.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }

    const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && addTaskCallback();
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

        error && setError(false);
    }

    const onClickHandlerCreator = (filter: FilterValuesType) => () => changeTodoListFilter(filter);

    const tasksElements = tasks.length ?
        <ul>{tasks.map((task: TaskType) => {
            const removeTaskCallback = () => removeTask(task.id)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, event.currentTarget.checked)
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                    <span className={task.isDone ? 'task-done' : ''}>{task.title} &nbsp;</span>
                    <button onClick={removeTaskCallback}>&times;</button>
                </li>
            )
        })}</ul> : <span>List is empty!</span>;

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error-input' : ''}
                    value={titleTask}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownInputHandler}
                />
                <button onClick={addTaskCallback}>+</button>
                {error && <div className={'error'}>{'Please, enter task title!'}</div>}
            </div>

            {tasksElements}

            <div>
                <button
                    className={filter === 'all' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('all')}>
                    All
                </button>
                <button
                    className={filter === 'active' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('active')}>
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'btn-active' : ''}
                    onClick={onClickHandlerCreator('completed')}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;