import { display } from "./display.js";
import {createProject, createTodo} from "./domain.js";
import {repo} from "./repo.js";
import {setMonth} from "https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm";

export const controller = (function(){
    let selectedCardProj = 0;
    let selectedIconProj = 0;
    let selectedIconTodo = 0;

    const init = () => {
        display.onClick({
            handleAddProject,
            handleAddTodo,
            handleSelectIcon,
            handleSelectIconTodo,
            handleDeleteProject,
            handleDeleteTodo,
            handleTodoCheck,
            handleCompleteTodo
        });
        display.onDashboardClick(handleDashboardClick);
        repo.readStorage();
        display.renderProjectsDashboard(repo.getProjects());
        renderInbox();
    }

    function renderInbox(){
        display.renderInbox();
        display.renderProjectsContainer(repo.getProjects());
        display.onAddProject(handleAddProject);
        display.onAddTodo(handleAddTodo);
    }

    function handleDashboardClick(card){
         let id = card.dataset.id;
         let proj = repo.getProjects().find(x => x.getId() === id);
         if(proj){
             selectedCardProj = id;
             display.renderProjectContent(proj);
         }
         else if(card.classList.contains('inbox'))
             renderInbox();
         else if(card.id === "today")
             handleToday();
         else if(card.id === "upcoming")
             handleUpcoming();
         else if(card.id == "anytime")
             handleAnytime();
         display.selectCard(card);
    }
    
    function handleToday(){
        let todos = [];
        repo.getProjects().forEach(p => p.getTodos().forEach(t => todos.push(t)));
        todos = todos.filter(t => t.getDueDate() <= new Date());
        display.renderTodayTodos(todos);
    }
    
    function handleUpcoming(){
        let todos = [];
        repo.getProjects().forEach(p => p.getTodos().forEach(t => todos.push(t)));
        todos = todos.filter(t => t.getDueDate() <= setMonth(new Date(), new Date().getMonth() + 1));
        display.renderUpcomingTodos(todos);
    }
    
    function handleAnytime(){
        let todos = [];
        repo.getProjects().forEach(p => p.getTodos().forEach(t => todos.push(t)));
        display.renderAnytimeTodos(todos);
    }

    function handleAddProject(target){
        const f = target.querySelector('.formProj');
        if (target.returnValue === 'default') {
            const data = new FormData(f);
            const proj = createProject(data.get("title") || "New project",
                    data.get("description") || '', null, data.get("priority"));
            repo.addProject(proj);
        }
        f.reset();
        renderInbox();
        display.renderProjectsDashboard(repo.getProjects());
    }
    
    function handleAddTodo(target){
        const f = target.querySelector('.formTodo');
        if(target.returnValue === 'default'){
            const data = new FormData(f);
            const todo = createTodo(data.get("title")  || new Date(), data.get("priority") || "untitled", data.get("dueDate"));
            repo.addToDoToProject(todo, selectedIconProj);
        }
        f.reset();
        display.renderTodosContainer(repo.getToDos(selectedIconProj));
    }
    
    function handleSelectIcon(target){
        selectedIconProj = target.dataset.id;
        display.selectIcon(target);
        display.renderTodosContainer(repo.getToDos(selectedIconProj));
    }

    function handleSelectIconTodo(target){
        selectedIconTodo = target.dataset.id;
        display.selectIconTodo(target);
    }

    function handleDeleteProject(target){
        repo.removeProject(selectedIconProj);
        renderInbox();
    }

    function handleDeleteTodo(target){
        repo.removeToDoFromProject(selectedIconTodo, selectedIconProj);
        display.renderTodosContainer(repo.getToDos(selectedIconProj));
    }
    
    function handleTodoCheck(target){
        let todoId = target.dataset.id;
        repo.updateState(todoId, selectedCardProj);
    }
    
    function handleCompleteTodo(target){
        let todoId = target.dataset.id;
        repo.updateState(todoId, selectedIconProj);
        display.renderTodosContainer(repo.getToDos(selectedIconProj));
    }

    return { init };
 })();
