import './styles.scss';
export default function(data) {
    return `
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input
              class="new-todo"
              placeholder="What needs to be done?"
              autofocus
              onkeyup="if(event.key=='Enter'){window.TodoList.add(this.value)}"
            />
          </header>
          <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" onclick="TodoList.selectAll(this.checked)" />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
             ${ data.todos.map(todo => todo.render()).join('') }
            </ul>
          </section>
          <footer class="footer">
            <span class="todo-count"><strong>1</strong> item(s) left</span>
            <ul class="filters" onclick="TodoList.filterTodos()">
              <li>
                <a href="#/" class="selected" onclick="TodoList.filterTodos('all')">All</a>
              </li>
              <li>
                <a href="#/active" onclick="TodoList.filterTodos('active')">Active</a>
              </li>
              <li>
                <a href="#/completed" onclick="TodoList.filterTodos('completed')">Completed</a>
              </li>
            </ul>
            <button class="clear-completed">Clear completed</button>
          </footer>
        </section>
        <footer class="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a>
          </p>
          <p>
            Refactored by
            <a href="https://github.com/cburgmer">Christoph Burgmer</a>
          </p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    `;
};