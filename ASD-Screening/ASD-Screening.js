const questions = [
    "Is it easy for you to get eye contact with others?",
    "Do you pretend during play? (e.g., care for dolls, talk on a toy phone)",
    "If someone else is visibly upset, do you show signs of wanting to comfort them?",
    "Would you describe your first words as delayed compared to peers?",
    "Do you stare at nothing with no apparent purpose?",
    "Do you find changes in routine or environment to be highly distressing?",
    "Do you engage in repetitive behaviors or routines? (e.g., hand-flapping, lining up objects)",
    "Do you prefer solitary activities over social interactions?",
    "Do you have unusual or intense interests in specific topics or activities? (e.g., memorizing facts about trains)",
    "Do you struggle with conversational skills, such as taking turns or staying on topic?",
    "Do you experience sensory sensitivities, such as being overly sensitive to sounds, lights, or textures?",
    "Do you have difficulties in understanding or using nonverbal communication, such as gestures or body language?"
];

document.addEventListener('DOMContentLoaded', () => {
    const questionnaireContainer = document.getElementById('questionnaire');
    
    questions.forEach((question, index) => {
        // Create question box
        const questionBox = document.createElement('div');
        questionBox.className = 'question-box';
        
        // Create question text
        const questionText = document.createElement('p');
        questionText.className = 'question';
        questionText.textContent = `${index + 1}. ${question}`;
        
        // Create buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const yesButton = document.createElement('button');
        yesButton.className = 'question-button'; // Add class for styling
        yesButton.textContent = 'Yes';
        yesButton.addEventListener('click', () => handleAnswer(index, 'Yes'));
        
        const noButton = document.createElement('button');
        noButton.className = 'question-button'; // Add class for styling
        noButton.textContent = 'No';
        noButton.addEventListener('click', () => handleAnswer(index, 'No'));
        
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(noButton);
        
        // Append elements to question box
        questionBox.appendChild(questionText);
        questionBox.appendChild(buttonContainer);
        
        // Append question box to questionnaire container
        questionnaireContainer.appendChild(questionBox);
    });
});

const answers = {};

function handleAnswer(questionIndex, answer) {
    answers[questionIndex] = answer;
    console.log(`Question ${questionIndex + 1}: ${answer}`);
    // Optional: Add code to handle submission or further processing
}

document.getElementById('submit-btn').addEventListener('click', () => {
    console.log('Submitted Answers:', answers);
    // Optional: Add code to send answers to a server or process them
});
