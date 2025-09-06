import { Project, createToDo } from './domain.js';
import { repo } from './repo.js';

export const service = ( function(){
    function addToDoToProject(tit, pri, projectID){
        let toDo = createToDo(tit, pri);
        repo.addToDoToProject(toDo, projectID);
    }
    function addProject(tit, des, date, pri){
        let proj = Project(tit, des, date, pri);
        repo.addProject(proj);
    }
    function removeToDoFromProject(toDoID, projectID){
        repo.removeToDoFromProject(toDoID, projectID);
        console.log(`Deleted project with ID ${toDoID}`)
    }
    function removeProject(projectID){
        repo.removeProject(projectID);
    }

    return { addToDoToProject, addProject, removeProject, removeToDoFromProject };
})();