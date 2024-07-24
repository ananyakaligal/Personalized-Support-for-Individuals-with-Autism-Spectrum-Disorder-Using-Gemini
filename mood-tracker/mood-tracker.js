document.addEventListener('DOMContentLoaded', () => {
    const moodSlider = document.getElementById('moodSlider');
    const logMoodBtn = document.getElementById('logMoodBtn');
    const factorsGrid = document.getElementById('factorsGrid');
    const moodJournal = document.getElementById('moodJournal');
    const saveJournalBtn = document.getElementById('saveJournalBtn');
    const moodPatterns = document.getElementById('moodPatterns');
    const currentDateElement = document.getElementById('currentDate');

    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);

    // Mood factors
    const factors = ['Sleep', 'Exercise', 'Diet', 'Social', 'Work', 'Hobby', 'Weather', 'Health'];
    let selectedFactors = [];

    // Initialize factors grid
    factors.forEach(factor => {
        const factorElement = document.createElement('div');
        factorElement.classList.add('factor-item');
        factorElement.textContent = factor;
        factorElement.addEventListener('click', () => toggleFactor(factorElement, factor));
        factorsGrid.appendChild(factorElement);
    });

    function toggleFactor(element, factor) {
        element.classList.toggle('selected');
        if (selectedFactors.includes(factor)) {
            selectedFactors = selectedFactors.filter(f => f !== factor);
        } else {
            selectedFactors.push(factor);
        }
    }

    // Mood logging
    logMoodBtn.addEventListener('click', () => {
        const mood = moodSlider.value;
        const date = new Date().toISOString().split('T')[0];
        const moodData = {
            date,
            mood,
            factors: selectedFactors,
            journal: moodJournal.value
        };
        saveMoodData(moodData);
        updateMoodChart();
        analyzeMoodPatterns();
        resetInputs();
    });

    function saveMoodData(data) {
        let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
        moodHistory.push(data);
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    }

    function resetInputs() {
        moodSlider.value = 3;
        selectedFactors = [];
        document.querySelectorAll('.factor-item').forEach(item => item.classList.remove('selected'));
        moodJournal.value = '';
    }

    // Mood chart
    let moodChart;

    function updateMoodChart() {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
        const labels = moodHistory.map(entry => entry.date);
        const data = moodHistory.map(entry => entry.mood);

        if (moodChart) {
            moodChart.destroy();
        }

        const ctx = document.getElementById('moodChart').getContext('2d');
        moodChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mood',
                    data: data,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            }
        });
    }

    function analyzeMoodPatterns() {
        const moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
        let patterns = [];

        if (moodHistory.length > 7) {
            const avgMood = moodHistory.slice(-7).reduce((sum, entry) => sum + parseInt(entry.mood), 0) / 7;
            patterns.push(`Your average mood for the last week is ${avgMood.toFixed(1)}`);

            const commonFactors = findCommonFactors(moodHistory.slice(-7));
            if (commonFactors.length > 0) {
                patterns.push(`Common factors affecting your mood: ${commonFactors.join(', ')}`);
            }
        }

        moodPatterns.innerHTML = patterns.map(pattern => `<p>${pattern}</p>`).join('');
    }

    function findCommonFactors(moodData) {
        const factorCounts = {};
        moodData.forEach(entry => {
            entry.factors.forEach(factor => {
                factorCounts[factor] = (factorCounts[factor] || 0) + 1;
            });
        });
        return Object.entries(factorCounts)
            .filter(([_, count]) => count > moodData.length / 2)
            .map(([factor, _]) => factor);
    }

    // Initialize
    updateMoodChart();
    analyzeMoodPatterns();
});