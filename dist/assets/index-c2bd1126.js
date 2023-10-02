(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();class i{static setApiURL(e){this.apiURL=e}static async findAll(){return await(await fetch(this.apiURL+"/tasks")).json()}}function n(s){return`
        <li data-id="${s.id}" class="${s.completed?"completed":""}">
            <div class="view">
            <input class="toggle" type="checkbox" ${s.completed?"checked":""} />
            <label>${s.content}</label>
            <button class="destroy"></button>
            </div>
        </li>
    `}class a{constructor(e){this.id=e.id,this.content=e.content,this.completed=e.completed,this.createdAt=e.createdAt}render(){return n(this)}}function d(s){return`
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input
              class="new-todo"
              placeholder="What needs to be done?"
              autofocus
            />
          </header>
          <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox" />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
             ${s.todos.map(e=>e.render()).join("")}
            </ul>
          </section>
          <footer class="footer">
            <span class="todo-count"><strong>1</strong> item(s) left</span>
            <ul class="filters">
              <li>
                <a href="#/" class="selected">All</a>
              </li>
              <li>
                <a href="#/active">Active</a>
              </li>
              <li>
                <a href="#/completed">Completed</a>
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
    `}class p{constructor(e){i.setApiURL(e.apiURL),this.elt=document.querySelector(e.domELT),this.todos=[],this.loadTodos()}async loadTodos(){const e=await i.findAll();this.todos=e.map(r=>new a(r)),this.render()}render(){this.elt.innerHTML=d(this),this.renderNotCompletedTodosCount()}renderNotCompletedTodosCount(){this.elt.querySelector(".todo-count strong").innerText=this.todos.filter(e=>!e.completed).length}}new p({apiURL:"https://6347f663db76843976b6e385.mockapi.io",domELT:"#app"});
