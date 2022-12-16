let form = document.querySelector("#todo-from");
let input = document.querySelector("#todo");
let todos = document.querySelector("#todos");
let clearTodos = document.querySelector("#clear-todos");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Date.now();
  localStorage.setItem(`todo${id}`, input.value);

  if (!localStorage.getItem(`todo${id}`)) {
    return alert("Bo'sh bo'lmasin!");
  }

  let template = `<li data-todo-id="${id}" class="capitalize my-8 text-4xl flex justify-between">
    <input type="checkbox" id="${id}" class="hidden" />
    <span class="todo" >${localStorage.getItem(`todo${id}`)}</span>
    <span class="actions flex w-36 justify-end gap-4">
      <button class="text-green-600 complete-todo">
        <label for="${id}"><i class="fa-regular fa-circle-check"></i></label>
      </button>
      <button class="text-sky-500" onclick="editTodo(${id})">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button onclick="deleteTodo(${id})" class="text-red-500">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
    </span>
  </li>`;

  todos.innerHTML += template;
  e.target.reset();
});

clearTodos.addEventListener("click", () => {
  todos.innerHTML = "";
  localStorage.clear();
});

function deleteTodo(id) {
  localStorage.removeItem(`todo${id}`);
  let todo = document.querySelector(`[data-todo-id="${id}"]`);
  todo.remove();
}

function editTodo(id) {
  let todo = document.querySelector(`[data-todo-id="${id}"]`);
  let span = todo.querySelector("span.todo");
  let actions = todo.querySelector(".actions");
  let todoName = span.textContent;

  let input = document.createElement("textarea");
  input.value = todoName;
  input.className = "bg-transparent text-gray-300 capitalize block w-full";

  span.remove();

  todo.insertBefore(input, actions);
  input.focus();

  input.addEventListener("blur", (e) => {
    let span = document.createElement("span");
    span.className = "todo";
    span.textContent = e.target.value;

    e.target.remove();
    todo.insertBefore(span, actions);
    localStorage.setItem(`edit${id}`, e.target.value);
    // localStorage.getItem(`edit${id}`);
  });
  localStorage.removeItem(`todo${id}`);
}
