import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import List from "@mui/material/List";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type TodoListPropsType = {
    todoListID: string
    title: string,
    filter: FilterValuesType
    tasks: Array<TaskType>,
    removeTask: (todoListID: string, taskId: string) => void,
    changeTodoListFilter: (todoListID: string, filter: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    editTaskTitle: (todoListID: string, taskId: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    editTodoListTitle: (todoListID: string, title: string) => void
};

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const {
        title,
        tasks,
        filter,
        todoListID,
        removeTask,
        addTask,
        changeTaskStatus,
        editTaskTitle,
        removeTodoList,
        changeTodoListFilter,
        editTodoListTitle
    } = props

    const onClickHandlerCreator = (filter: FilterValuesType) => () => changeTodoListFilter(todoListID, filter);


    const tasksElements = tasks.map((task: TaskType) => {

        const removeTaskCallback = () => removeTask(todoListID, task.id)

        const changeTaskStatusCallback = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListID, task.id, event.currentTarget.checked)

        const changeTitle = (title: string) => {
            editTaskTitle(todoListID, task.id, title)
        }

        return (
            <ListItem
                key={task.id}
                secondaryAction={
                    <IconButton onClick={removeTaskCallback} aria-label="delete">
                        <Delete/>
                    </IconButton>
                }
                disablePadding
            >
                <ListItemButton dense>
                    <ListItemIcon>
                        <Checkbox
                            disableRipple
                            color="primary"
                            checked={task.isDone}
                            onChange={changeTaskStatusCallback}
                        />
                    </ListItemIcon>
                    <EditableSpan title={task.title} changeTitle={changeTitle}/>
                </ListItemButton>
            </ListItem>
        )
    })

    const removeTodoListCallback = () => {
        removeTodoList(todoListID)
    }

    const addTaskCallback = (title: string) => {
        addTask(todoListID, title)
    }

    const changeTodoListTitle = (title: string) => {
        editTodoListTitle(todoListID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoListCallback}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback}/>

            <List>{tasksElements}</List>

            <div style={{marginTop: 15, display: 'flex', columnGap: 15}}>
                <Button variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={onClickHandlerCreator('all')}>All
                </Button>
                <Button color={'primary'} variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={onClickHandlerCreator('active')}>Active
                </Button>
                <Button color={'secondary'} variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={onClickHandlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;