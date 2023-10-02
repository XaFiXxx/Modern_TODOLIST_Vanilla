import '../style.scss';
import TodoList from './components/todoList/TodoList.js';

// Instancier une nouvelle TodoList
// en lui envoyant l'élément DOM sur lequel se greffer
// et l'URL de l'API à utiliser: https://6347f663db76843976b6e385.mockapi.io/

window.TodoList = new TodoList ({
    apiURL: "https://64f650c82b07270f705e618d.mockapi.io",
    domELT: "#app"
}); 