export function createToDo(title, priority) {
    return {
        id: crypto.randomUUID(),
        title: title,
        priority: priority,
        completed: false,
        updateState() {
            this.completed = !this.completed;
        }
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
    
    project.getToDos = function() {
        return arr;
    }
    project.addToDo = function(toDo) {
        return arr.push(toDo);
    }
    project.removeToDo = function(toDo) {
        const index = arr.findIndex(obj => obj.id === toDo.id);
        if(index !== -1){
            arr.splice(index, 1);
            return true;
        }
        return false;
    }
    return project;
}