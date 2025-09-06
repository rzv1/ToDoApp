export const repo = (function() {
    let todos = [];
    let projects = [];

    const getToDos = (projectID) => projects.find((p) => p.id === projectID).todos || "";
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

    // function addToDo(toDo) {
    //     todos.push(toDo);
    //     populateStorage();
    // }

    // function removeToDo(id) {
    //     const index = todos.findIndex((td) => id === td.id);
    //     todos.splice(index, 1);
    //     populateStorage();
    // }

    function removeToDoFromProject(toDoID, projectID) {
        const indexProject = projects.findIndex((p) => p.id === projectID);
        const indexToDo = getToDos(projectID).findIndex((t) => t.id === toDoID);
        projects[indexProject].todos.splice(indexToDo, 1);
        populateStorage();
    }

    function addProject(project) {
        projects.push(project);
        populateStorage();
    }

    function addToDoToProject(toDo, projectID) {
        const index = projects.findIndex((p) => p.id === projectID);
        projects[index].todos.push(toDo);
        populateStorage();
    }

    function removeProject(id) {
        const index = projects.findIndex((p) => p.id === id);
        projects.splice(index, 1);
        populateStorage();
    }

    function updateState(toDoID, projectID) {
        const indexProject = projects.findIndex((p) => p.id === projectID);
        const indexToDo = getToDos(projectID).findIndex((t) => t.id === toDoID);
        console.log(getToDos(projectID));
        console.log(toDoID);
        const state = projects[indexProject].todos[indexToDo].completed;
        
        projects[indexProject].todos[indexToDo].completed = !state;
        populateStorage();
    }

    return { readStorage, addProject, updateState, addToDoToProject, getProjects, getToDos, removeProject, removeToDoFromProject };
})();