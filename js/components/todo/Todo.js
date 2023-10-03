import getTemplate from './template';
import DB from '../../DB.js'


export default class {
    constructor(data){
        this.id = data.id;
        this.content = data.content;
        this.completed = data.completed;
        this.createdAt = data.createdAt;
    }
    render () {
        return getTemplate(this);
    }
    async toggleComplete () {
        // Inverser l'état de complétion
        this.completed = !this.completed;

        // Mettre à jour la représentation dans le DOM
        const todo = document.querySelector(`[data-id="${this.id}"]`);
        todo.classList.toggle('completed', this.completed);
        const checkbox = todo.querySelector('.toggle');
        checkbox.checked = this.completed;
        
        // Lancer la mise à jour dans la base de données via TodoList
        DB.updateOneById(this.id, { completed: this.completed });

        TodoList.renderNotCompletedTodosCount();

    }

    async delete () {
        const todo = document.querySelector(`[data-id="${this.id}"]`);
        // Modifier dans le DOM
        todo.remove();
        // Modifier l'API
        await DB.deleteOneById(this.id);
        //Lancer la function de todoListe
        TodoList.deleteOne(this.id);
    }

    update () {
        // Modifier dans le DOM
        // Lancer le todoList.updateOneById() qui lance DB.updateOneById()
    }
}