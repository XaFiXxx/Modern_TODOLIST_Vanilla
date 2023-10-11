(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();class l{static setApiURL(e){this.apiURL=e}static async findAll(){return await(await fetch(this.apiURL+"/todos")).json()}static async addOne(e){return await(await fetch(this.apiURL+"/todos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).json()}static async updateOneById(e,t){return await(await fetch(`${this.apiURL}/todos/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json()}static async deleteOneById(e){return await(await fetch(`${this.apiURL}/todos/${e}`,{method:"DELETE"})).json()}}function r(i){return`
    <li data-id="${i.id}" class="${i.completed?"completed":""}">
    <div class="view">
    <input class="toggle" type="checkbox" ${i.completed?"checked":""} onclick="TodoList.todos.filter(todo => todo.id == ${i.id})[0].toggleComplete()" />
    <label ondblclick="TodoList.todos.filter(todo => todo.id == ${i.id})[0].edit()">${i.content}</label>
    <button data-id="${i.id}" class="destroy" onclick="TodoList.todos.filter(todo => todo.id == ${i.id})[0].delete()"></button>
    </div>
</li>
    `}class n{constructor(e){this.id=e.id,this.content=e.content,this.completed=e.completed,this.createdAt=e.createdAt}render(){return r(this)}async toggleComplete(){this.completed=!this.completed;const e=document.querySelector(`[data-id="${this.id}"]`);e.classList.toggle("completed",this.completed);const t=e.querySelector(".toggle");t.checked=this.completed,await l.updateOneById(this.id,{completed:this.completed}),TodoList.renderNotCompletedTodosCount()}async delete(){document.querySelector(`[data-id="${this.id}"]`).remove(),await l.deleteOneById(this.id),TodoList.deleteOne(this.id)}edit(){const e=document.querySelector(`[data-id="${this.id}"]`);e.classList.add("editing");const t=document.createElement("input");t.className="edit",t.value=this.content,t.onblur=()=>this.finishEditing(t.value),t.onkeyup=d=>{d.key==="Enter"&&this.finishEditing(t.value)},e.appendChild(t),t.focus()}async finishEditing(e){this.content=e;const t=document.querySelector(`[data-id="${this.id}"]`);t.classList.remove("editing"),t.querySelector("label").textContent=e,await l.updateOneById(this.id,{content:this.content})}}function a(i){return`
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
             ${i.todos.map(e=>e.render()).join("")}
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
            <button class="clear-completed" onclick="TodoList.clearCompletedTodos()">Clear completed</button>
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
    `}class p{constructor(e){l.setApiURL(e.apiURL),this.elt=document.querySelector(e.domELT),this.todos=[],this.newTodoInput=null,this.loadTodos()}async loadTodos(){const e=await l.findAll();this.todos=e.map(t=>new n(t)),this.render()}render(){this.elt.innerHTML=a(this),this.newTodoInput=this.elt.querySelector(".new-todo"),this.renderNotCompletedTodosCount()}renderNotCompletedTodosCount(){this.elt.querySelector(".todo-count strong").innerText=this.todos.filter(e=>!e.completed).length}async add(e){const t={content:e,completed:!1},d=await l.addOne(t),o=new n(d);this.todos.unshift(o);const s=document.createElement("div");document.querySelector(".todo-list").insertBefore(s,document.querySelector(".todo-list").children[0]),s.outerHTML=o.render(),this.newTodoInput.value="",this.renderNotCompletedTodosCount()}deleteOne(e){this.todos=this.todos.filter(t=>t.id!==e),this.renderNotCompletedTodosCount()}filterTodos(e){const t=document.querySelectorAll(".todo-list li");document.querySelectorAll(".filters a").forEach(o=>o.classList.remove("selected")),t.forEach(o=>{const s=o.classList.contains("completed");switch(e){case"all":o.style.display="",document.querySelector('.filters a[href="#/"]').classList.add("selected");break;case"active":o.style.display=s?"none":"",document.querySelector('.filters a[href="#/active"]').classList.add("selected");break;case"completed":o.style.display=s?"":"none",document.querySelector('.filters a[href="#/completed"]').classList.add("selected");break}})}async selectAll(e){for(let t of this.todos)if(t.completed!==e){t.completed=e,await l.updateOneById(t.id,{completed:e});const d=document.querySelector(`[data-id="${t.id}"]`);d.className=e?"completed":"",d.querySelector(".toggle").checked=e}this.renderNotCompletedTodosCount()}async clearCompletedTodos(){const e=this.todos.filter(t=>t.completed);for(let t of e){await l.deleteOneById(t.id);const d=this.todos.indexOf(t);d>-1&&this.todos.splice(d,1)}this.render(),this.renderNotCompletedTodosCount()}}window.TodoList=new p({apiURL:"https://64f650c82b07270f705e618d.mockapi.io",domELT:"#app"});
