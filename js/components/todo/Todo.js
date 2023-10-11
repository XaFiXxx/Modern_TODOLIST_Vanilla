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
        // Sélectionne l'élément de la tâche à éditer en fonction de son ID
        const todoElement = document.querySelector(`[data-id="${this.id}"]`);
    
        // Ajoute la classe 'editing' pour activer le mode d'édition visuelle
        todoElement.classList.add('editing');
    
        // Crée un champ d'édition (input) pour la tâche
        const editInput = document.createElement('input');
        editInput.className = 'edit'; // Ajoute la classe 'edit' à l'élément input
        editInput.value = this.content; // Remplit le champ d'édition avec le contenu actuel de la tâche
    
        // Gère l'événement lorsque le champ d'édition perd le focus (l'utilisateur clique ailleurs)
        editInput.onblur = () => this.finishEditing(editInput.value);
    
        // Gère l'événement lorsqu'une touche est relâchée dans le champ d'édition
        editInput.onkeyup = (e) => {
            if (e.key === 'Enter') {
                // Si l'utilisateur appuie sur la touche "Entrée," termine l'édition
                this.finishEditing(editInput.value);
            }
        };
    
        // Ajoute le champ d'édition à l'élément de la tâche
        todoElement.appendChild(editInput);
    
        // Place le focus sur le champ d'édition, permettant à l'utilisateur de commencer à éditer immédiatement
        editInput.focus();
    }
    
    
    async finishEditing(newContent) {
        // Met à jour le contenu de la tâche avec le nouveau contenu
        this.content = newContent;
    
        // Sélectionne l'élément de la tâche à partir de son ID
        const todoElement = document.querySelector(`[data-id="${this.id}"]`);
    
        // Supprime la classe 'editing' pour désactiver le mode d'édition visuelle
        todoElement.classList.remove('editing');
    
        // Met à jour le texte du label de la tâche avec le nouveau contenu
        todoElement.querySelector('label').textContent = newContent;
    
        // Met à jour la base de données en utilisant l'API et l'ID de la tâche
        // Ceci implique une opération asynchrone, donc "await" est utilisé pour attendre la fin de la mise à jour
        await DB.updateOneById(this.id, { content: this.content });
    }
    
}    