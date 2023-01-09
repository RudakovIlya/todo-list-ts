import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import {TaskType} from "../state/tasksReducer";

type TaskPropsType = {
    task: TaskType
    todoListID: string
    removeTask: (todoListID: string, taskId: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    changTaskTitle: (todoListID: string, taskID: string, title: string) => void
}

export const Task: FC<TaskPropsType> = memo((props) => {

    const {task, todoListID, removeTask, changeTaskStatus, changTaskTitle} = props

    const removeTaskCallback = () => removeTask(todoListID, task.id)

    const changeTaskStatusCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todoListID, task.id, event.currentTarget.checked), [changeTaskStatus, todoListID, task.id])

    const changeTitle = useCallback((title: string) => {
        changTaskTitle(todoListID, task.id, title)
    }, [changTaskTitle, todoListID, task.id])

    return (
        <ListItem
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
    );
});
