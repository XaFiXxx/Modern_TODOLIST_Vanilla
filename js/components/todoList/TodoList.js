// Création de la classe TodoList
// Avec comme propriétés:
// - elt, todos qui doit contenir des objets de type Todo
import DB from "../../DB";
import Todo from "../todo/Todo";
import getTemplate from './template.js';

export default class  {
    constructor(data) {
        // Configure l'URL de l'API à partir des données fournies
        DB.setApiURL(data.apiURL);
    
        // Sélectionne l'élément DOM spécifié
        this.elt = document.querySelector(data.domELT);
    
        // Initialise un tableau vide pour stocker les todos
        this.todos = [];
    
        // Initialise la variable pour l'élément d'entrée de nouvelle todo
        this.newTodoInput = null;
    
        // Charge les todos depuis l'API
        this.loadTodos(); 
    }
    
    async loadTodos() {
        // Récupère la liste des todos depuis l'API
        const todos = await DB.findAll();
    
        // Transforme chaque todo en un objet Todo et les stocke dans this.todos
        this.todos = todos.map(todo => new Todo(todo));
    
        // Affiche les todos dans l'interface utilisateur
        this.render();
    }
    
    render() {
        // Remplace le contenu de l'élément DOM avec un modèle basé sur les todos
        this.elt.innerHTML = getTemplate(this);
    
        // Sélectionne l'élément d'entrée pour les nouvelles todos
        this.newTodoInput = this.elt.querySelector('.new-todo');
    
        // Met à jour l'affichage du compteur de todos non complétés
        this.renderNotCompletedTodosCount();
    }
    
    renderNotCompletedTodosCount() {
        // Sélectionne l'élément DOM qui affiche le nombre de todos non complétés
        this.elt.querySelector('.todo-count strong').innerText = 
            this.todos.filter((todo) => !todo.completed).length;
    }
    
    async add(data) {
        // 1. Crée un nouvel objet de todo avec le contenu fourni et le statut "non complété"
        const todo = {
            content: data,
            completed: false
        };
    
        // 2. Ajoute le todo à l'API et attend la réponse
        const addedTodo = await DB.addOne(todo);
    
        // 3. Crée un nouvel objet Todo à partir des données de l'API
        const newTodo = new Todo(addedTodo);
    
        // 4. Ajoute le nouveau todo au début de la liste this.todos
        this.todos.unshift(newTodo);
    
        // 5. Crée un nouvel élément DOM pour le todo
        const newTodoElement = document.createElement('div');
    
        // Insère le nouvel élément DOM au début de la liste des todos dans le DOM
        document.querySelector('.todo-list').insertBefore(newTodoElement, document.querySelector('.todo-list').children[0]);
    
        // Remplace le contenu HTML de l'élément nouvellement créé par la représentation HTML du todo
        newTodoElement.outerHTML = newTodo.render();   
    
        // 6. Vide l'input pour les nouvelles todos
        this.newTodoInput.value = '';
    
        // 7. Recompte le nombre de todos non complétés et met à jour l'interface utilisateur
        this.renderNotCompletedTodosCount();
    }
    

        deleteOne(id) {
            // Filtrer les todos en supprimant celui avec l'ID donné
            this.todos = this.todos.filter(todo => todo.id !== id);
        
            // Mettre à jour le compteur du nombre de todos non terminés
            this.renderNotCompletedTodosCount();
        }
        

        filterTodos(filterType) {
            // Sélectionner tous les éléments li dans la liste de todos
            const allTodos = document.querySelectorAll('.todo-list li');
        
            // Sélectionner tous les éléments ancrés de filtre
            const filters = document.querySelectorAll('.filters a');
            
            // Retirer la classe 'selected' de tous les éléments de filtre
            filters.forEach(filter => filter.classList.remove('selected'));
            
            // Parcourir tous les todos
            allTodos.forEach(todo => {
                // Vérifier si le todo est complété en fonction de sa classe CSS
                const isCompleted = todo.classList.contains('completed');
                
                // Selon le type de filtre sélectionné
                switch (filterType) {
                    case 'all':
                        // Afficher tous les todos
                        todo.style.display = '';
                        // Mettre en surbrillance le filtre "All"
                        document.querySelector('.filters a[href="#/"]').classList.add('selected');
                        break;
                    case 'active':
                        // Afficher les todos non complétés
                        todo.style.display = isCompleted ? 'none' : '';
                        // Mettre en surbrillance le filtre "Active"
                        document.querySelector('.filters a[href="#/active"]').classList.add('selected');
                        break;
                    case 'completed':
                        // Afficher les todos complétés
                        todo.style.display = isCompleted ? '' : 'none';
                        // Mettre en surbrillance le filtre "Completed"
                        document.querySelector('.filters a[href="#/completed"]').classList.add('selected');
                        break;
                }
            });
        }
        

        async selectAll(isChecked) {
            // Parcourir tous les todos
            for (let todo of this.todos) {
                if (todo.completed !== isChecked) {
                    // Mettre à jour la propriété "completed" du todo
                    todo.completed = isChecked;
                        // Mettre à jour l'API en utilisant l'ID du todo
                        await DB.updateOneById(todo.id, { completed: isChecked });
        
                        // Mettre à jour le DOM directement pour refléter le changement de statut
                        const todoElement = document.querySelector(`[data-id="${todo.id}"]`);
                        todoElement.className = isChecked ? 'completed' : '';
                        todoElement.querySelector('.toggle').checked = isChecked; 
                }
            }
        
            // Mettre à jour le compteur du nombre de todos non terminés
            this.renderNotCompletedTodosCount();
        }
        

        async clearCompletedTodos() {
            // Filtrer les todos complétés et les stocker dans un tableau
            const completedTodos = this.todos.filter(todo => todo.completed);
            
            // Parcourir tous les todos complétés
            for (let todo of completedTodos) {
                    // Supprimer le todo de la base de données en utilisant son ID
                    await DB.deleteOneById(todo.id); 
        
                    // Rechercher l'index du todo dans le tableau principal
                    const index = this.todos.indexOf(todo);
        
                    // Si l'index est trouvé, supprimer le todo de l'array principal
                    if (index > -1) {
                        this.todos.splice(index, 1); 
                    }
            }
            
            // Mettre à jour l'interface utilisateur après la suppression
            this.render(); 
        
            // Mettre à jour le compteur du nombre de todos non terminés
            this.renderNotCompletedTodosCount();
        }
        
        
}