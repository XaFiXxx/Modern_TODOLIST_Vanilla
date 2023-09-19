import DB from '../../DB.js';
import Todo from '../todo/Todo.js'

//création de la classe  TodoList
// avec comme propriétés:
// - elt, todo qui doit contenir des objets de type TODO

export default class TodoList {
    constructor(data){
        DB.setApiURL(data.apiURL);
        this.elt = document.querySelector(data.DomELT);
        this.todos = [];
        this.loadTodos();
    }
    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = todos.map(todo => new Todo(todo));
        this.render();
    }
    render() {
        console.table(this.todos);
    } 
}   