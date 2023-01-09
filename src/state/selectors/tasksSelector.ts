import {FilterValuesType} from "../todoListReducer";
import {TaskType} from "../tasksReducer";

export const filteredTaskSelector = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
    switch (filter) {
        case "all": {
            return tasks
        }
        case "active": {
            return tasks.filter(task => !task.isDone)
        }
        case "completed": {
            return tasks.filter(task => task.isDone)
        }
        default: {
            return tasks
        }
    }
}