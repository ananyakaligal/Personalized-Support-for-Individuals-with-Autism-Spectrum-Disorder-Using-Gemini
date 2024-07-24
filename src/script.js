document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const dateElement = document.querySelector('.date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);

    // Progress ring animation
    const progressPath = document.querySelector('.progress-ring__progress');
    const progressText = document.querySelector('.progress-text');
    
    function setProgress(percent) {
        const radius = 80;
        const circumference = radius * Math.PI;
        const offset = circumference - (percent / 100) * circumference;
        
        progressPath.style.strokeDasharray = `${circumference} ${circumference}`;
        progressPath.style.strokeDashoffset = offset;
        progressText.textContent = `${percent}%`;
    }

    // Set initial progress (75% in this case)
    setProgress(75);

    // Mood selector
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            // Here you could add code to save the selected mood
        });
    });

    // Task list
    const taskCheckboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                label.style.textDecoration = 'line-through';
            } else {
                label.style.textDecoration = 'none';
            }
            updateProgress();
        });
    });

    function updateProgress() {
        const totalTasks = taskCheckboxes.length;
        const completedTasks = Array.from(taskCheckboxes).filter(checkbox => checkbox.checked).length;
        const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
        setProgress(progressPercentage);
        
        const progressMessage = document.querySelector('.daily-progress p');
        progressMessage.textContent = `Great job! You've completed ${completedTasks} out of ${totalTasks} daily tasks.`;
    }

    // Achievement tracker
    const achievements = document.querySelectorAll('.achievement');
    achievements.forEach(achievement => {
        if (achievement.dataset.achieved === 'true') {
            achievement.style.opacity = '1';
        }
    });
});