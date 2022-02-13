// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners

loadEventListeners();

function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTask);
    // Add task event 
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click',clearTask);
    // Filter task event
    filter.addEventListener('keyup',filterTask);
}

// Get Tasks From LocalStorage

function getTask()
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Appned li to ul
        //console.log(li);
        taskList.appendChild(li);
    });
}

// Add task

function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task");
    }
    else {
        // Create li element
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Appned li to ul
        console.log(li);
        taskList.appendChild(li);

        // Store in LocalStorage
        storeTaskInLocalStorage(taskInput.value);

        // clear input

        taskInput.value = '';

        e.preventDefault();
    }


}

// Store Task

function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove Task

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.remove();

            // Remove from LocalStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear Task

function clearTask()
{
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear From LocalStorage

    clearTasksFromLocalStorage();
}

// Clear Tasks from LocalStorage

function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

// Filter task

function filterTask(e)
{
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1)
        {
            task.style.display = 'block';
        }
        else
        {
            task.style.display = 'none';
        }
    });
}