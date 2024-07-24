document.addEventListener('DOMContentLoaded', () => {
    const taskTimeline = document.getElementById('taskTimeline');
    const newTaskForm = document.getElementById('newTaskForm');
    const currentDateElement = document.getElementById('currentDate');

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);

    // Sample tasks (replace with actual data storage later)
    let tasks = [
        { time: '08:00', name: 'Wake up', description: 'Start your day with a smile!' },
        { time: '09:00', name: 'Breakfast', description: 'Enjoy a healthy breakfast' },
        { time: '10:00', name: 'Study Session', description: 'Focus on your current learning goals' }
    ];

    function renderTasks() {
        taskTimeline.innerHTML = '';
        tasks.sort((a, b) => a.time.localeCompare(b.time));
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            taskElement.innerHTML = `
                <div class="task-time">${task.time}</div>
                <div class="task-content">
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                </div>
            `;
            taskTimeline.appendChild(taskElement);
        });
    }

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = {
            time: document.getElementById('taskTime').value,
            name: document.getElementById('taskName').value,
            description: document.getElementById('taskDescription').value
        };
        tasks.push(newTask);
        renderTasks();
        newTaskForm.reset();
    });

    // Initial render
    renderTasks();
});