export const repo = (function() {
    let todos = [];
    let projects = [];

    const getToDos = () => todos;
    const getProjects = () => projects;

    function readStorage() {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    projects = JSON.parse(localStorage.getItem("projects")) || [];
    console.log(todos);
    console.log(projects);
    }

    function populateStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log("Done");
    }

    function addToDo(toDo) {
        todos.push(toDo);
        populateStorage();
    }

    function removeToDo(toDo) {
        const index = todos.findIndex((td) => toDo.id === td.id);
        todos.splice(index, 1);
        populateStorage();
    }

    function addProject(project) {
        projects.push(project);
        populateStorage();
    }

    function addToDoToProject(toDo, project) {
        const index = projects.findIndex((p) => p.id === project.id);
        projects[index].addToDo(toDo);
        populateStorage();
    }

    function removeProject(project) {
        const index = projects.findIndex((p) => p.id === project.id);
        projects.splice(index, 1);
        populateStorage();
    }

    return { readStorage, populateStorage, addProject, addToDo, getProjects, getToDos };
})();