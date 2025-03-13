document.getElementById("loginButton").addEventListener("click", function() {
    let username = document.getElementById("username").value;
    let role = document.getElementById("role").value;
    if (username.trim() === "") {
        alert("Please enter a username.");
        return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    document.getElementById("auth").style.display = "none";
    document.getElementById("task-section").style.display = "block";
});

document.getElementById("addTaskButton").addEventListener("click", function() {
    let taskText = document.getElementById("taskInput").value;
    let deadline = document.getElementById("taskDeadline").value;
    let priority = document.getElementById("taskPriority").value;
    let status = document.getElementById("taskStatus").value;
    
    if (taskText.trim() === "") {
        alert("Please enter a task.");
        return;
    }
    
    let task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.innerHTML = `<strong>${taskText}</strong><br>Deadline: ${deadline}<br>Priority: ${priority}`;
    task.ondragstart = function(event) {
        event.dataTransfer.setData("text", event.target.id);
    };
    
    document.getElementById(status).appendChild(task);
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDeadline").value = "";
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let task = document.getElementById(data);
    event.target.appendChild(task);
}