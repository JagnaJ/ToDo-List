function onPageLoaded() {
    const input = document.querySelector("input[type='text']");
    const ul = document.querySelector("ul.todos");
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const showTipsButton = document.querySelector("button.showTips");
    const closeTipsButton = document.querySelector("a.closeTips");
    const overlay = document.querySelector("#overlay");

    function createTodo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        textSpan.textContent = newTodo;

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("todo-trash");
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt");
        deleteBtn.appendChild(icon);

        li.append(textSpan, deleteBtn);
        ul.appendChild(li);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
            saveTodos();
        });
    }

    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }

    function saveTodos() {
        localStorage.setItem("todos", ul.innerHTML);
    }

    function clearTodos() {
        ul.innerHTML = "";
        localStorage.removeItem("todos");
    }

    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        deleteButtons.forEach((button) => {
            listenDeleteTodo(button);
        });
    }

    function showTips() {
        overlay.style.height = "100%";
    }

    function closeTips() {
        overlay.style.height = "0";
    }

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which === keyEnter) {
            createTodo();
            saveTodos();
        }
    });

    ul.addEventListener("click", onClickTodo);
    saveButton.addEventListener("click", saveTodos);
    clearButton.addEventListener("click", clearTodos);
    showTipsButton.addEventListener("click", showTips);
    closeTipsButton.addEventListener("click", closeTips);

    loadTodos();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
