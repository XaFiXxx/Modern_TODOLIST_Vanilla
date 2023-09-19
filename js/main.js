import '../style.scss';
import TodoList from './components/todoList/TodoList.js';

// instancier une nouvelle TODOList 
// en lui envoyant l'élément HTML du DOM sur lequel se greffé

new TodoList ({
    apiURL: "https://64f650c82b07270f705e618d.mockapi.io",
    DomELT: "#app"
})
