import './styles.scss'

export default function (todo) {
    return `
    <li data-id="${ todo.id }" class="${ todo.completed ? 'completed' : '' }">
    <div class="view">
    <input class="toggle" type="checkbox" ${ todo.completed ? 'checked' : '' } onclick="TodoList.todos.filter(todo => todo.id == ${ todo.id })[0].toggleComplete()" />
    <label>${ todo.content }</label>
    <button data-id="${ todo.id }" class="destroy" onclick="TodoList.todos.filter(todo => todo.id == ${ todo.id })[0].delete()"></button>
    </div>
</li>
    `;
}