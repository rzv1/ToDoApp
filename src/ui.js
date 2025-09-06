import { repo } from './repo.js';
import { createToDo, Project } from './domain.js';
import { service } from './service.js';
import { event } from './events.js';

export const displayCtrl = (function() {
    const content = document.querySelector(".content");

    function show(){
        renderInbox();
        event.inboxEvents();
        renderProjects();
    }

    /*
        Function for displaying home page
    */
    function renderInbox() {
        content.classList.add("fullView");
        insertInboxHTML();
        renderProjectInbox();
    }

    /*
        Function for inserting home page layout
    */
    function insertInboxHTML() {
        content.innerHTML = `
            <div class="container" id="proj">
                <div class="container-header">
                    PROJECTS
                </div>
            </div>
            <div class="container" id="todo">
                <div class="container-header">
                    ToDoS
                </div>
            </div>
            <dialog id="projModal">
                <form method="dialog" class="form-proj">
                <h3>New Project</h3>
                <label id="form">TITLE <input name="title"></label>
                <label id="form">DESCRIPTION <textarea name="description" rows="3" cols="19"></textarea></label>
                <label id="form">
                <label>PRIORITY<select id="priority" name="priority">
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </select></label>
                 <menu>
                    <button value="cancel">Cancel</button>
                    <button id="projCreate" value="default">Create</button>
                </menu>
                </form>
            </dialog>
            <dialog id="todoModal">
                <form method="dialog" class="form-todo">
                <h3>New ToDo</h3>
                <label id="form">TITLE <input name="title"></label>
                <label id="form">PRIORITY<select id="priority" name="priority">
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </select></label>
                <menu>
                    <button value="cancel">Cancel</button>
                    <button id="projCreate" value="default">Create</button>
                </menu>
                </form>
            </dialog>
        </div> `;
    }
    
    /*
        Function for rendering projects icon on the side
    */
    function renderProjects(){
        const projects = document.querySelector(".project-cards");
        projects.innerHTML = "";
        repo.getProjects().forEach((p) => {
            let div = document.createElement("div");
            div.innerHTML = `      
            <div class="card" data-id=${p.id}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" fill="gray" height="24"><title>food-takeout-box-outline</title><path d="M7.79 18L7.28 11H16.74L16.23 18H7.79M9.83 5H14.16L16.96 7.73L16.87 9H7.12L7.03 7.73L9.83 5M22 7.46L20.59 6.05L19 7.63L19.03 7.07L15 3H9L4.97 7.07L5 7.57L3.41 6L2 7.44L5.23 10.55L5.93 20H18.07L18.77 10.56L22 7.46Z" /></svg>
                <h3>${p.title}</h3>
            </div>`;
            projects.appendChild(div);
        });
    }

    /*
        Function for rendering projects list
    */
    function renderProjectInbox() {
        const projContainer = document.querySelector("#proj");
        let div = document.createElement("div");
        div.classList.add("container-icons");
        repo.getProjects().forEach((p) => {

            div.innerHTML += `
                    <div class="icon" data-id="${p.id}">
                        ${p.title}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" id="deleteProj" viewBox="0 0 24 24" width="20" height="20"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>
                    </div>
            `
           
        });
        div.innerHTML += `<div class="plus" id="addproj"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg></div>`;
        projContainer.appendChild(div);
    }

    /*
        Function for rendering project's todos list
    */
    function renderToDoInbox(projectID) {
        const todoContainer = document.querySelector("#todo");
        todoContainer.innerHTML = "";
        let div = document.createElement("div");
        todoContainer.innerHTML =               
                `<div class="container-header">
                    ToDoS
                </div>`;
        div.classList.add("container-icons");
        repo.getToDos(projectID).forEach((t) => {
            div.innerHTML += `
                    <div class="icon-todo ${t.priority === "high" ? "high" : (t.priority === "mid" ? "mid" : "low")}" data-id="${t.id}">
                        ${t.title}
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-todo-svg" id="deleteTodo" viewBox="0 0 24 24" width="20" height="20"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>
                    </div>
            `
        });
        div.innerHTML += `<div class="plus" id="addtodo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg></div>`
        todoContainer.appendChild(div);
    }

    /*
        Function for displaying project's page
    */
    function renderProject(p) {
        content.classList.remove("fullView");
        content.innerHTML = `
        <p class="title"></p>
        <p class="description"></p>
        <div class="todos">
            ${p.todos.map(t => `
                <label><input type="checkbox" id="todoCheck" data-todo="${t.id}" ${t.completed ? "checked" : ""}>
                <span>${t.title}</span>
                </label>`).join("")}
        </div>`;
        content.querySelector(".title").textContent = p.title;
        content.querySelector(".description").textContent = p.description || "";
        event.projectEvents();
        console.log("rendered");
    }

    return { show, renderToDoInbox, renderProject };
})();