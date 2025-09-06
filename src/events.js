import { displayCtrl } from "./ui.js";
import { service } from "./service.js";
import { repo } from "./repo.js";


export const event = (function(){
    let selectedIconProj = "";
    let selectedIconTodo = "";
    let binded = false;

    /*
        Events bundle for home page initial load
    */
    function inboxEvents() {
        dashboardCards();
        homeEvents();
    }

    /*
        Selector for side menu buttons
    */
    function selectCard(card) {
        const cards = document.querySelectorAll('.card');
        cards.forEach( (c) => {
            c.classList.remove('selected');
        });
        card.classList.add('selected');
    }
    /*
        Selection event for side menu buttons
    */
    function dashboardCards() {
        if(binded) return;
        document.querySelector('.cards').addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if(!card) return;
            if(card.classList.contains('inbox')) displayCtrl.show();
            selectCard(card);
            const id = card.dataset.id;
            const p = repo.getProjects().find(x => x.id === id);
            if (p) displayCtrl.renderProject(p);
        });
    }


    /*
        Utilitaries for home page selectors
    */
    function selectIcon(icon) {
        const icons = document.querySelectorAll(".icon");
        icons.forEach( (i) => {
            i.classList.remove("selected-icon");
        });
        icon.classList.add("selected-icon");
    }

    function selectIconToDo(icon) {
        const icons = document.querySelectorAll(".icon-todo");
        icons.forEach( (i) => {
            i.classList.remove("selected-icon-todo");
        })
        icon.classList.add("selected-icon-todo");
        selectedIconTodo = icon.dataset.id;
    }
    /*
        Selection event for projects list
    */

    function homeEvents() {
        if (binded) return;
        document.addEventListener("click", (e) => {
            binded = true;
            const item = e.target;
            if(item.closest('#deleteProj')){
                service.removeProject(selectedIconProj);
                displayCtrl.show();
                return;
            }

            if(item.closest('#deleteTodo')){
                service.removeToDoFromProject(selectIconToDo, selectedIconProj);
                displayCtrl.renderToDoInbox(selectedIconProj);
                return;
            }

            if(item.closest('.icon')){
                selectIcon(item);
                selectedIconProj = item.dataset.id;
                displayCtrl.renderToDoInbox(selectedIconProj);
                return;
            }

            if(item.closest('.icon-todo')){
                selectIconToDo(item);
                return;
            }

            if(item.closest('#addproj')){
                const dlg = document.getElementById('projModal');
                dlg.showModal();
                dlg.addEventListener('close', () => {
                    const f = dlg.querySelector('.form-proj');
                    if (dlg.returnValue === 'default') {
                        const data = new FormData(f);
                        service.addProject(data.get("title") || "New project", 
                        data.get("description") || '', null, data.get("priority"));
                        displayCtrl.show();
                    }
                    f.reset();
                });
                return;
            }

            if(item.closest('#addtodo')){
                const tododlg = document.getElementById('todoModal');
                tododlg.showModal();
                tododlg.addEventListener('close', () => {
                    const f = tododlg.querySelector('.form-todo');
                    if (tododlg.returnValue === 'default') {
                        const data = new FormData(f);
                        service.addToDoToProject(data.get("title") || "untitled", data.get("priority"), selectedIconProj);
                        displayCtrl.renderToDoInbox(selectedIconProj);
``                  }
                f.reset();
                }, { once: true });
                return;
            }
        });
    }

    function projectEvents() {
        document.addEventListener('click', (e) => {
            const item = e.target;

            if(item.closest('#todoCheck')){
                const id = item.dataset.todo;
                const project = document.querySelector('.selected').dataset.id;
                repo.updateState(id, project);
                return;
            }
        })
    }
    /*
        Project page add new to do feature
    */
    function projectViewAdder() {
        const newToDo = document.querySelector(".newToDo");
        const inputBox = document.querySelector("#newToDoInput");
        newToDo.addEventListener('click', (e) => {
            inputBox.classList.toggle("invisible");
        });
    }

    return { inboxEvents, projectEvents, projectViewAdder };
})();