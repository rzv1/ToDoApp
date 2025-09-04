import { repo } from './repo.js';
import { displayCtrl } from './ui.js';

// const proj = Project("Project 3");
// proj.addToDo(createToDo("El", "este", "da", "nu"));

// repo.addProject(proj);

repo.readStorage();
displayCtrl.show();