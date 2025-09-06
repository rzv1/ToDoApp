export function createToDo(title, priority) {
    return {
        id: crypto.randomUUID(),
        title: title,
        priority: priority,
        completed: false,
    }
}

export let Project = function(title, description, dueDate, priority) {
    let project = {};
    let arr = [];
    project.id = crypto.randomUUID();
    project.title = title;
    project.description = description;
    project.dueDate = dueDate;
    project.priority = priority;
    project.todos = arr;
    return project;
}