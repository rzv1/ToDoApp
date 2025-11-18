import { intervalToDuration, compareAsc } from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

export const display = (function() {
    const dashboard = document.querySelector('.dashboard');
    const content = document.querySelector('.content');
    const projects = document.querySelector(".project-cards");
    
    function onDashboardClick(callback) {
        dashboard.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if(card) {
                selectCard(card);
                callback(card);
            }
        });
    }

    function renderInbox(){
        content.innerHTML = `
            <div class="container" id="proj">
                <div class="containerHeader">
                    PROJECTS
                </div>
            </div>
            <div class="container" id="todo">
                <div class="containerHeader">
                    ToDoS
                </div>
            </div>
            <dialog id="projModal">
                <form method="dialog" class="formProj">
                <h3>New Project</h3>
                <label id="form">TITLE <input name="title" maxlength="15"></label>
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
                <form method="dialog" class="formTodo">
                <h3>New ToDo</h3>
                <label id="form">TITLE <input name="title"></label>
                <label id="form">Due date<input id="dueDate" name="dueDate" type="datetime-local"></label>
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

    function renderProjectsDashboard(proj){
        projects.innerHTML = "";
        proj.forEach((p) => {
            let div = document.createElement("div");
            div.innerHTML = `      
            <div class="card" data-id=${p.getId()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" fill="gray" height="24"><title>food-takeout-box-outline</title><path d="M7.79 18L7.28 11H16.74L16.23 18H7.79M9.83 5H14.16L16.96 7.73L16.87 9H7.12L7.03 7.73L9.83 5M22 7.46L20.59 6.05L19 7.63L19.03 7.07L15 3H9L4.97 7.07L5 7.57L3.41 6L2 7.44L5.23 10.55L5.93 20H18.07L18.77 10.56L22 7.46Z" /></svg>
                <h3>${p.getTitle()}</h3>
            </div>`;
            projects.appendChild(div);
        });
    }

    function renderProjectsContainer(proj){
        const projectContainer = document.getElementById("proj");
        let div = document.createElement("div");
        div.classList.add("containerIcons");
        proj.forEach((p) => {

            div.innerHTML += `
                    <div id="icon" class="icon" data-id="${p.getId()}">
                        ${p.getTitle()}
                        <svg xmlns="http://www.w3.org/2000/svg" class="iconSvg" id="deleteProj" viewBox="0 0 24 24" width="20" height="20"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>
                    </div>
            `

        });
        div.innerHTML += `<div class="plus" id="addproj"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg></div>`;
        projectContainer.appendChild(div);
    }

    function renderTodosContainer(todos){
        const todoContainer = document.querySelector("#todo");
        todoContainer.innerHTML = "";
        let div = document.createElement("div");
        todoContainer.innerHTML =
            `<div class="containerHeader">
                    ToDoS
                </div>`;
        div.classList.add("containerIcons");
        todos.sort((a, b) => {
            if(a.getCompleted() - b.getCompleted() !== 0)
                return a.getCompleted() - b.getCompleted();
            
            return compareAsc(a.getDueDate(), b.getDueDate());
        });
        
        todos.forEach((t) => {
            let divChild = document.createElement("div");
            divChild.classList.add("icon");
            divChild.id = "iconTodo"; 
            divChild.dataset.id = t.getId();
            divChild.classList.add(t.getPriority() === "high" ? "high" : (t.getPriority() === "mid" ? "mid" : "low"));
            if(t.getCompleted() === true) divChild.classList.add("completed");
            divChild.innerHTML += `
                    <div class="todoNumber">#${t.getNumber()}</div>
                    <div class="todoTitle">${t.getTitle()}</div>
                    <div class="todoFooter">
                        <button class="completeTodoBtn">${t.getCompleted() === true ? "Undo" : "Complete"}</button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="iconSvg" id="deleteTodo" viewBox="0 0 24 24" width="20" height="20"><title>delete-circle</title><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z" /></svg>
                        
            `
           let dif = intervalToDuration({ start: new Date(), end: t.getDueDate() });
           if(dif.days > 0)
               divChild.innerHTML += `<span class="dueDate">${dif.days} days and ${dif.hours} hrs</span>`
           else if(dif.hours > 0)
               divChild.innerHTML += `<span class="dueDate">${dif.hours} hrs and ${dif.minutes} min</span>`
           else if(dif.minutes > 0)
               divChild.innerHTML += `<span class="dueDate">${dif.minutes} min and ${dif.seconds} sec</span>`
           else if(dif.seconds > 0)
               divChild.innerHTML += `<div class="dueDate">${dif.seconds} sec</div>`
           else
               divChild.innerHTML += `<div class="dueDate">Past due</div>`
            divChild.innerHTML += `</div> </div>`;
            div.appendChild(divChild);
        });
        div.innerHTML += `<div class="plus" id="addtodo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg></div>`
        todoContainer.appendChild(div);
    }

    function renderProjectContent(proj){
        content.classList.remove("fullView");
        content.innerHTML = `
        <p class="title"></p>
        <p class="description"></p>
        <div class="todos">
            ${proj.getTodos().map(t => `
                <label><input type="checkbox" id="todoCheck" data-id="${t.getId()}" ${t.getCompleted() ? "checked" : ""}>
                <span>${t.getTitle()}</span>
                </label>`).join("")}
        </div>`;
        content.querySelector(".title").textContent = proj.getTitle();
        content.querySelector(".description").textContent = proj.getDescription() || "";
        
    }
    
    function onAddProject(callback){
        const addDialog = document.getElementById("projModal");
        addDialog.addEventListener('close', () => {
            callback(addDialog);
        });
    }

    function displayAddProject(){
        const addDialog = document.getElementById("projModal");
        addDialog.showModal();
    }
    
    function onAddTodo(callback){
        const addDialog = document.getElementById("todoModal");
        addDialog.addEventListener('close', () => {
            callback(addDialog);
        })
    }

    function displayAddTodo(){
        const addDialog = document.getElementById("todoModal");
        addDialog.showModal();
    }

    function onClick(controller){
        document.addEventListener('click', (e) => {
            const target = e.target;
            if(target.closest('#addproj')){
                displayAddProject();
            }
            else if(target.closest("#addtodo")){
                displayAddTodo();
            }
            else if(target.closest("#deleteProj")){
                if(confirm("Are you sure you want to delete this project?") === true)
                    controller.handleDeleteProject(target);
            }
            else if(target.closest("#deleteTodo")){
                if(confirm("Are you sure? This action cannot be undone.") === true)
                    controller.handleDeleteTodo(target);
            }
            else if(target.closest(".completeTodoBtn")){
                if(confirm("Are you sure?") === true)
                    controller.handleCompleteTodo(target.closest("#iconTodo"));
            }
            else if(target.closest("#icon")){
                controller.handleSelectIcon(target);
            }
            else if(target.closest("#iconTodo")){
                controller.handleSelectIconTodo(target.closest("#iconTodo"));
            }
            else if(target.closest("#todoCheck")){
                controller.handleTodoCheck(target);
            }
            else
                clearIconTodoSelection();
        })
    }

    function clearCardSelection(){
        const cards = document.querySelectorAll('.card');
        cards.forEach((c) => c.classList.remove("selected"));
    }

    function clearIconSelection(){
        const icons = document.querySelectorAll('#icon');
        icons.forEach((i) => i.classList.remove("selectedIcon"));
    }

    function clearIconTodoSelection(){
        const iconsTodo = document.querySelectorAll('#iconTodo');
        iconsTodo.forEach((i) => i.classList.remove("selectedIcon"));
    }

    function selectCard(card){
        clearCardSelection();
        card.classList.add("selected");
    }

    function selectIcon(icon){
        clearIconSelection();
        icon.classList.add("selectedIcon");
    }

    function selectIconTodo(icon){
        clearIconTodoSelection();
        icon.classList.add("selectedIcon");
    }

    return { renderInbox, renderProjectsDashboard, renderProjectsContainer, renderTodosContainer, renderProjectContent, onClick, onDashboardClick, onAddProject, onAddTodo, selectCard, selectIcon, selectIconTodo };
})();