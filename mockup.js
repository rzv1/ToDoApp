import {createProject, createTodo} from "./domain.js";
import {addMonths, addDays} from 'date-fns';

export const mockup = (function () {
    let projects = [];
    
    let project1 = createProject("Project 1", "This is a description", addMonths(new Date(), 1), "high");
    let todo1 = createTodo("Something", "high", addMonths(new Date(), 1), false, 1);
    let todo2 = createTodo("One ToDo", "mid", addMonths(new Date(), 2), false, 2);
    let todo3 = createTodo("Todo", "low", new Date(), false, 3);
    let todo4 = createTodo("completed", "high", new Date(), true, 4);
    project1.addTodo(todo1);
    project1.addTodo(todo2);
    project1.addTodo(todo3);
    project1.addTodo(todo4);
    
    let project2 = createProject("Empty Project", "This project is empty", addDays(new Date(), 1), "low");
    
    let project3 = createProject("Project 3", "This is a another description", addDays(new Date(), 2), "mid");
    let todo5 = createTodo("SomethingNew", "high", addDays(new Date(), 2), false, 5);
    let todo6 = createTodo("Some ToDo", "mid", new Date(), false, 6);
    let todo7 = createTodo("ToDo", "low", addDays(new Date(), 1), false, 7);
    let todo8 = createTodo("completedNew", "high", addDays(new Date(), 1), true, 8);
    project3.addTodo(todo5);
    project3.addTodo(todo6);
    project3.addTodo(todo7);
    project3.addTodo(todo8);
    
    projects.push(project1);
    projects.push(project2);
    projects.push(project3);
    
    function getData(){
        return projects;
    }
    return {getData};
})();