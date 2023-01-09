import React, {ChangeEvent, FC, memo} from 'react';
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
import {TaskType} from "../state/tasksReducer";
import {FilterValuesType} from "../state/todoListReducer";
import {useAppSelector} from "../state/hooks/hooks";
import {filteredTaskSelector} from "../state/selectors/tasksSelector";

type TodoListPropsType = {
    todoListID: string
    title: string,
    filter: FilterValuesType
    removeTask: (todoListID: string, taskId: string) => void,
    changeTodoListFilter: (todoListID: string, filter: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changTaskTitle: (todoListID: string, taskId: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListID: string) => void
    editTodoListTitle: (todoListID: string, title: string) => void
};

const TodoList: FC<TodoListPropsType> = memo((props) => {

    const {
        title,
        filter,
        todoListID,
        removeTask,
        addTask,
        changeTaskStatus,
        changTaskTitle,
        removeTodoList,
        changeTodoListFilter,
        editTodoListTitle
    } = props

    const tasks = useAppSelector((state) => filteredTaskSelector(state.tasks[todoListID], filter))

    const onClickHandlerCreator = (filter: FilterValuesType) => () => changeTodoListFilter(todoListID, filter);

    const tasksElements = tasks.map((task: TaskType) => {

        const removeTaskCallback = () => removeTask(todoListID, task.id)

        const changeTaskStatusCallback = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListID, task.id, event.currentTarget.checked)

        const changeTitle = (title: string) => {
            changTaskTitle(todoListID, task.id, title)
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
                <Button style={{
                    background: filter === 'all' ? '#000000' : 'inherit',
                    border: '1px solid #000000',
                }}
                        variant={filter === 'all' ? 'outlined' : 'contained'}
                        onClick={onClickHandlerCreator('all')}>All
                </Button>
                <Button style={{background: filter === 'active' ? '#000000' : 'inherit', border: '1px solid #000000'}}
                        color={'primary'}
                        variant={filter === 'active' ? 'outlined' : 'contained'}
                        onClick={onClickHandlerCreator('active')}>Active
                </Button>
                <Button
                    style={{background: filter === 'completed' ? '#000000' : 'inherit', border: '1px solid #000000'}}
                    color={'secondary'}
                    variant={filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={onClickHandlerCreator('completed')}>Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;