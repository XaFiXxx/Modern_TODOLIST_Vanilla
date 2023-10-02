// Création de la classe TodoList
// Avec comme propriétés:
// - elt, todos qui doit contenir des objets de type Todo
import DB from "../../DB";
import Todo from "../todo/Todo";
import getTemplate from './template.js';

export default class  {
    constructor(data){
        DB.setApiURL(data.apiURL);
        this.elt = document.querySelector(data.domELT);
        this.todos = [];
        this.newTodoInput = null;
        this.loadTodos(); 
    }
    
    async loadTodos() {
        const todos = await DB.findAll();
        this.todos = todos.map(todo => new Todo(todo));
        this.render();
    }

    render () {
        this.elt.innerHTML = getTemplate(this);
        this.newTodoInput = this.elt.querySelector('.new-todo');
        this.renderNotCompletedTodosCount();
    }

    renderNotCompletedTodosCount () {
        this.elt.querySelector('.todo-count strong').innerText = 
            this.todos.filter((todo) => !todo.completed).length;
    }
    add (data) {
        // 1. Ajout de la todo dans le this.todos
            const todo = {
                content: data,
                completed: false
                };
            const newTodo = new Todo(todo);
            this.todos.unshift(newTodo);
        // 2. Ajout de la todo dans le DOM
                // this.elt.querySelector('.todo-list').innerHTML = 
                // newTodo.render() + this.elt.querySelector('.todo-list').innerHTML;

                // Créer l'élément
                // Mettre le render dedans
                // faire un insertBefore
                const newTodoElement = document.createElement('div');
                document.querySelector('.todo-list').insertBefore(newTodoElement,document.querySelector('.todo-list').children[0]);
                newTodoElement.outerHTML = newTodo.render();

        // 3. Ajout de la todo dans l'API
                DB.addOne(todo);
                

        // 4. Je vide l'input
            this.newTodoInput.value = '';
    
        // Je recompte les not completed
            this.renderNotCompletedTodosCount();
        }

        filterTodos(filterType) {
            const allTodos = this.elt.querySelectorAll('.todo-list li');
            const filters = this.elt.querySelectorAll('.filters a');
            filters.forEach(filter => filter.classList.remove('selected'));

            allTodos.forEach(todo => {
                const isCompleted = todo.classList.contains('completed');
                switch (filterType) {
                    case 'all':
                        todo.style.display = '';
                        this.elt.querySelector('.filters a[href="#/"]').classList.add('selected');
                        break;
                    case 'active':
                        todo.style.display = isCompleted ? 'none' : '';
                        this.elt.querySelector('.filters a[href="#/active"]').classList.add('selected');
                        break;
                    case 'completed':
                        todo.style.display = isCompleted ? '' : 'none';
                        this.elt.querySelector('.filters a[href="#/completed"]').classList.add('selected');
                        break;
                }
            });
          }
}