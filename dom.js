

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const darkModeBtn = document.getElementById("darkModeBtn");

function addTask() {
  if (input.value.trim() !== "") {
    tasks.push({
      text: input.value,
      completed: false,
    });

    input.value = "";

    saveTasks();

    renderTask();
  }
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
  <div class="task">

    <label>

      <input
        type="checkbox"
        onchange="completeTask(${i}, this)"
        ${tasks[i].completed ? "checked" : ""}
      >

      <input
        id="task-${i}"
        value="${tasks[i].text}"
        disabled
        class="editInput"
        style="
          text-decoration:
          ${tasks[i].completed ? "line-through" : "none"};
        "
      >

    </label>

    <button
      class="editBtn"
      onclick="editTask(${i})"
    >
      ✏️
    </button>

    <button
      class="deleteBtn"
      onclick="deleteTask(${i})"
    >
      🗑️
    </button>

  </div>
`;

    taskList.append(newDiv);
  }
}

function editTask(index) {
  const taskRow = document.getElementById(`task-${index}`);

  const button = taskRow.parentElement.parentElement.querySelector(".editBtn");

  if (taskRow.disabled) {
    taskRow.disabled = false;

    taskRow.focus();

    button.textContent = "Save";
  } else {
    if (taskRow.value.trim() === "") {
      alert("Task cannot be empty!");

      return;
    }

    tasks[index].text = taskRow.value;

    taskRow.disabled = true;

    button.textContent = "✏️";

    saveTasks();

    renderTask();
  }
}

function completeTask(index, checkbox) {
  if (checkbox.checked) {
    tasks[index].completed = true;
  } else {
    tasks[index].completed = false;
  }

  saveTasks();

  renderTask();
}

function deleteTask(index) {
  const answer = confirm("Are you sure you want to delete this task?");

  if (answer) {
    tasks.splice(index, 1);

    saveTasks();

    renderTask();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const darkMode = document.body.classList.contains("dark-mode");

  localStorage.setItem("darkMode", darkMode);
}

darkModeBtn.addEventListener("click", toggleDarkMode);

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

renderTask();


