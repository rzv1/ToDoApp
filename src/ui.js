import { repo } from './repo.js';
import { createToDo, Project } from './domain.js';

export const displayCtrl = (function() {
    const content = document.querySelector(".content");
    const newToDo = document.querySelector(".newToDo");
    const inputBox = document.querySelector("#newToDoInput");
    const projects = document.querySelector(".project-cards");

    function show(){
        renderInbox();
        inboxEvents();
        renderProjects();
    }
    
    /*
        Function for rendering project's icons on the side
    */
    function renderProjects(){
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

    function inboxEvents() {
        document.querySelector('.cards').addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if(!card) return;
            if(card.classList.contains('inbox')) show();
            selectCard(card);
            const id = card.dataset.id;
            const p = repo.getProjects().find(x => x.id === id);
            if (p) renderProject(p);
        })
        content.addEventListener("submit", (e) => {
            if(e.target.matches(".form-proj")){
                e.preventDefault();
                handleSubmitproj(e);
                show();
            }
            if(e.target.matches(".form-todo")){
                e.preventDefault();
                handleSubmittodo(e);
                show();
            }
        });
        renderInbox();
    }

    function projectEvents() {
        newToDo.addEventListener('click', (e) => {
            inputBox.classList.remove("invisible");
        })
    }

    function handleSubmitproj(event) {
        event.preventDefault();
        const form = event.target;
        addProject(form.title.value, form.description.value,
            form.date.value, form.priority.value
        );
    }

    function handleSubmittodo(e) {
        e.preventDefault();
        const form = e.target;
        addToDo(form.title.value, form.priority.value);
    }

    function selectCard(card) {
        const cards = document.querySelectorAll('.card');
        cards.forEach( (c) => {
            c.classList.remove('selected');
        });
        card.classList.add('selected');
    }

    function renderProjectInbox() {
        const projContainer = document.querySelector("#proj");
        let div = document.createElement("div");
        div.classList.add("container-icons");
        repo.getProjects().forEach((p) => {

            div.innerHTML += `
                    <div class="icon">
                        ${p.title}
                    </div>
            `
           
        })
        projContainer.appendChild(div);
    }

    function renderToDoInbox() {
        const todoContainer = document.querySelector("#todo");
        repo.getToDos().forEach((t) => {
            let div = document.createElement("div");
            div.innerHTML = `
                <div class="container-icons">
                    <div class="icon">
                        ${t.title}
                    </div>
                </div>
            `
            todoContainer.appendChild(div);
        })
    }

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
            <form class="form-proj">
                <label for="title">Create a new project:</label>
                <input type="text" name="title" placeholder="title"><br>
                <input type="text" name="description" placeholder="description"><br>
                <input type="date" name="date">
                <label for="priority">Choose priority:</label>
                <select id="priority" name="priority">
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </select>
                <button type="submit">create</button>
            </form>
            <form class="form-todo">
                <label for="title">Create a new ToDo:</label>
                <input type="text" name="title" placeholder="title"><br>
                <label for="priority">Choose priority:</label>
                <select id="priority" name="priority">
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </select>
                <button type="submit">create</button>
            </form>
        </div> `;
    }

    function renderInbox() {
        content.classList.add("fullView");
        insertInboxHTML();
        renderProjectInbox();
        renderToDoInbox();
    }

    function renderProject(p) {
        content.classList.remove("fullView");
        content.innerHTML = `
        <p class="title"></p>
        <p class="description"></p>
        <div class="todos">
            ${p.todos.map(t => `
                <label><input type="checkbox" data-todo="${t.id}" ${t.completed ? "checked" : ""}>
                <span>${t.title}</span>
                </label>`).join("")}
        </div>
        <div>
            <label class="invisible"><input type="checkbox" name="add"><input type="text" name="add"></label>
            <button type="button">new</button>
        </div>`;
        content.querySelector(".title").textContent = p.title;
        content.querySelector(".description").textContent = p.description || "";
        console.log("rendered");
    }
    
    function addToDo(tit, pri){
        const toDo = createToDo(tit, pri);
        repo.addToDo(toDo);
    }

    function addProject(tit, des, date, pri) {
        const proj = Project(tit, des, date, pri);
        repo.addProject(proj);
    }

    function addToDoToProject() {

    }
    return { inboxEvents, handleSubmitproj, handleSubmittodo, renderInbox, show };
})();