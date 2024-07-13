const addEntryButton = document.getElementById('add-entry-button');
const entriesContainer = document.getElementById('entries-container');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

addEntryButton.addEventListener('click', () => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    
    const textArea = document.createElement('textarea');
    
    const micButton = document.createElement('button');
    micButton.textContent = '🎤';
    micButton.classList.add('mic-button');

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    micButton.addEventListener('click', () => {
        if (recognition.recognizing) {
            recognition.stop();
            micButton.textContent = '🎤';
        } else {
            activeTextArea = textArea;
            recognition.start();
            micButton.textContent = '⏹️';
        }
    });
    
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        activeTextArea.value = transcript;
    };
    
    recognition.onend = () => {
        micButton.textContent = '🎤';
    };

    entryDiv.appendChild(dateInput);
    entryDiv.appendChild(textArea);
    entryDiv.appendChild(micButton);
    entriesContainer.appendChild(entryDiv);
});
