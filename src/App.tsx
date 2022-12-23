import React, {useState} from 'react';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";
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

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'active'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ]);

    const [tasks, setTasks] = useState<TasksType>({
        [todoListID1]: [
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
        ],
        [todoListID2]: [
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
        ],
    });

    const removeTask = (todoListID: string, taskId: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)});
    };

    const addTask = (todoListID: string, title: string) => {
        setTasks({...tasks, [todoListID]: [...tasks[todoListID], {id: v1(), title, isDone: false}]})
    }

    const getFilteredTasks = (filter: FilterValuesType, tasks: TaskType[]): TaskType[] => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case 'active':
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, isDone} : task)
        });
    }

    const editTaskTitle = (todoListID: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, title} : task)
        })
    }

    const changeTodoListFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map((todoList) => todoList.id === todoListID ? {...todoList, filter} : todoList))
    };

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todoListID));
        delete tasks[todoListID];
    }

    const addTodoListCallback = (title: string) => {
        const newTodoLIstID = v1();
        setTodoLists([{id: newTodoLIstID, title, filter: 'all'}, ...todoLists]);
        setTasks({...tasks, [newTodoLIstID]: []});
    }

    const editTodoListTitle = (todoListID: string, title: string) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todoListID ? {...todoList, title} : todoList))
    }

    const todoListsItem = todoLists.map(todoList => {
        const filteredTasks = getFilteredTasks(todoList.filter, tasks[todoList.id])
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
                        editTaskTitle={editTaskTitle}
                        tasks={filteredTasks}
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
