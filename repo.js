import {createProject, createTodo} from "./domain.js";
import {mockup} from "./mockup.js";

export const repo = (function() {
    let projects = [];
    let number = 0;

    const getToDos = (projectID) => projects.find((p) => p.getId() === projectID).getTodos() || [];
    const getProjects = () => projects;

    function readStorage() {
        const stored = JSON.parse(localStorage.getItem("projects")) || [];
        if(stored.length === 0) {
            projects = mockup.getData();
            return;
        }
        for(let p of stored){
            let proj = createProject(p.title, p.description, p.dueDate, p.priority);
            const todos = p.todos || [];
            for(let t of todos) {
                proj.addTodo(createTodo(t.title, t.priority, new Date(t.dueDate), t.completed, t.number));
                if(t.number > number) number = t.number;
            }
            projects.push(proj);
        }
        //console.log(projects);
        number++;
    }

    function populateStorage() {
        const arr = projects.map(p => ({
            title: p.getTitle(),
            description: p.getDescription(),
            dueDate: p.getDueDate(),
            priority: p.getPriority(),
            todos: p.getTodos().map(t => ({
                title: t.getTitle(),
                priority: t.getPriority(),
                dueDate: t.getDueDate(),
                completed: t.getCompleted(),
                number: t.getNumber()
            }))
        }));
        localStorage.setItem("projects", JSON.stringify(arr));
        console.log("Done");
    }

    function removeToDoFromProject(toDoID, projectID) {
        const indexProject = projects.findIndex((p) => p.getId() === projectID);
        const indexToDo = getToDos(projectID).findIndex((t) => t.getId() === toDoID);
        projects[indexProject].getTodos().splice(indexToDo, 1);
        populateStorage();
    }

    function addProject(project) {
        projects.push(project);
        populateStorage();
    }

    function addToDoToProject(toDo, projectID) {
        toDo.setNumber(number++);
        const index = projects.findIndex((p) => p.getId() === projectID);
        projects[index].addTodo(toDo);
        populateStorage();
    }

    function removeProject(id) {
        const index = projects.findIndex((p) => p.getId() === id);
        projects.splice(index, 1);
        populateStorage();
    }

    function updateState(toDoID, projectID) {
        const indexProject = projects.findIndex((p) => p.getId() === projectID);
        const indexToDo = getToDos(projectID).findIndex((t) => t.getId() === toDoID);
        //console.log(getToDos(projectID));
        //console.log(toDoID);
        //console.log(projects[indexProject]);
        const state = projects[indexProject].getTodos()[indexToDo].getCompleted();
        projects[indexProject].getTodos()[indexToDo].setCompleted(!state);
        populateStorage();
    }

    return { readStorage, addProject, updateState, addToDoToProject, getProjects, getToDos, removeProject, removeToDoFromProject };
})();