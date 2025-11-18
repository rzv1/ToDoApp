import {addDays} from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

export function createTodo(title, priority, dueDate = addDays(new Date(), 1), completed = false) {
    let _id = crypto.randomUUID();
    let _title = title;
    let _priority = priority;
    let _completed = completed;
    let _dueDate = dueDate;
    return {
        getId: () => _id,
        getTitle: () => _title,
        getPriority: () => _priority,
        getDueDate: () => _dueDate,
        setDueDate: (dueDate) => { _dueDate = dueDate; },
        getCompleted: () => _completed,
        setCompleted: (completed) => { _completed = completed; }
    }
}

export function createProject(title, description, dueDate, priority) {
    let _todos = [];
    let _id = crypto.randomUUID();
    let _title = title;
    let _description = description;
    let _dueDate = dueDate;
    let _priority = priority;
    return { getId: () => _id,
    getTitle: () => _title,
    getDescription: () => _description,
    getDueDate: () => _dueDate,
    getPriority: () => _priority,
    addTodo: (todo) => { _todos.push(todo); },
    getTodos: () => _todos, 
    };
}