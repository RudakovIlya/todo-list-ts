import React, {FC, memo, useCallback, useMemo} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import {TaskType} from "../state/tasksReducer";
import {FilterValuesType} from "../state/todoListReducer";
import {useAppSelector} from "../state/hooks/hooks";
import {filteredTaskSelector} from "../state/selectors/tasksSelector";
import {Task} from "./Task";

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

    const onClickHandlerCreator = useCallback((filter: FilterValuesType) => () => changeTodoListFilter(todoListID, filter), [changeTodoListFilter, todoListID]);

    const tasksElements = useMemo(() => tasks.map((task: TaskType) => {
        return (
            <Task key={task.id} task={task} changTaskTitle={changTaskTitle} changeTaskStatus={changeTaskStatus}
                  todoListID={todoListID} removeTask={removeTask}/>
        )
    }), [changeTaskStatus, changTaskTitle, removeTask, tasks, todoListID])

    const removeTodoListCallback = useCallback(() => {
        removeTodoList(todoListID)
    }, [removeTodoList, todoListID])

    const addTaskCallback = useCallback((title: string) => {
        addTask(todoListID, title)
    }, [addTask, todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        editTodoListTitle(todoListID, title)
    }, [editTodoListTitle, todoListID])

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