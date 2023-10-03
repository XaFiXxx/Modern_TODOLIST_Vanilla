import getTemplate from './template';
import DB from '../../DB.js'


export default class {
    constructor(data) {
        // Initialise les propriétés de l'objet Todo à partir des données fournies
        this.id = data.id;
        this.content = data.content;
        this.completed = data.completed;
        this.createdAt = data.createdAt;
    }
    
    render() {
        // Renvoie un modèle HTML basé sur les propriétés de l'objet Todo
        return getTemplate(this);
    }
    
    async toggleComplete() {
        // Inverse l'état de complétion de la todo
        this.completed = !this.completed;
    
        // Met à jour la représentation dans le DOM en modifiant les classes CSS et la case à cocher
        const todo = document.querySelector(`[data-id="${this.id}"]`);
        todo.classList.toggle('completed', this.completed);
        const checkbox = todo.querySelector('.toggle');
        checkbox.checked = this.completed;
    
        // Met à jour la base de données via l'API en utilisant l'ID de la todo
        await DB.updateOneById(this.id, { completed: this.completed });
    
        // Lance la mise à jour du compteur de todos non complétés dans TodoList
        TodoList.renderNotCompletedTodosCount();
    }
    
    async delete() {
        // Sélectionne l'élément DOM correspondant à la todo et le supprime du DOM
        const todo = document.querySelector(`[data-id="${this.id}"]`);
        todo.remove();
    
        // Supprime la todo de la base de données en utilisant l'API et l'ID de la todo
        await DB.deleteOneById(this.id);
    
        // Lance la fonction "deleteOne" de TodoList pour mettre à jour la liste de todos
        TodoList.deleteOne(this.id);
    }
    
    edit() {
        // Active le mode d'édition pour la todo en ajoutant la classe 'editing' et en créant un champ d'édition
        const todoElement = document.querySelector(`[data-id="${this.id}"]`);
        todoElement.classList.add('editing');
        const editInput = document.createElement('input');
        editInput.className = 'edit';
        editInput.value = this.content;
        editInput.onblur = () => this.finishEditing(editInput.value);
        editInput.onkeyup = (e) => {
            if (e.key === 'Enter') {
                this.finishEditing(editInput.value);
            }
        };
        todoElement.appendChild(editInput);
        editInput.focus();
    }
    
    async finishEditing(newContent) {
        // Met à jour le contenu de la todo avec le nouveau contenu
        this.content = newContent;
    
        // Met à jour le DOM en supprimant la classe 'editing' et en mettant à jour le texte du label
        const todoElement = document.querySelector(`[data-id="${this.id}"]`);
        todoElement.classList.remove('editing');
        todoElement.querySelector('label').textContent = newContent;
    
        // Met à jour la base de données en utilisant l'API et l'ID de la todo
        await DB.updateOneById(this.id, { content: this.content });
    }
}    