import React, {useCallback} from 'react';
import TodoList from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC
} from "./state/todoListReducer";
import {addTaskAC, changTaskStatusAC, changTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {useAppDispatch, useAppSelector} from "./state/hooks/hooks";

function App() {

    const dispatch = useAppDispatch();

    const {todoLists} = useAppSelector((state) => state)

    const removeTask = useCallback((todoListID: string, taskId: string) => {
        dispatch(removeTaskAC(todoListID, taskId))
    }, [dispatch])

    const addTask = useCallback((todoListID: string, title: string) => {
        dispatch(addTaskAC(todoListID, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((todoListID: string, taskId: string, isDone: boolean) => {
        dispatch(changTaskStatusAC(todoListID, taskId, isDone))
    }, [dispatch])

    const changTaskTitle = useCallback((todoListID: string, taskId: string, title: string) => {
        dispatch(changTaskTitleAC(todoListID, taskId, title))
    }, [dispatch])

    const changeTodoListFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, filter))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])

    const addTodoListCallback = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const editTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    }, [dispatch])

    const todoListsItem = todoLists.map(todoList => {

        return (
            <Grid item xs={2} md={4} key={todoList.id}>
                <Paper elevation={2} style={{padding: 15, borderRadius: 16}}>
                    <TodoList
                        todoListID={todoList.id}
                        key={todoList.id}
                        title={todoList.title}
                        filter={todoList.filter}
                        addTask={addTask}
                        changeTodoListFilter={changeTodoListFilter}
                        removeTask={removeTask}
                        changTaskTitle={changTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        editTodoListTitle={editTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar style={{background: '#000000'}} position="static">
                <Container style={{padding: 0}} maxWidth={'lg'}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todo
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container fixed maxWidth={'lg'}>
                <Grid container style={{padding: 20}}>
                    <AddItemForm addItem={addTodoListCallback}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsItem}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
