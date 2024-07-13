const addEntryButton = document.getElementById('add-entry-button');
const exportButton = document.getElementById('export-button');
const entriesContainer = document.getElementById('entries-container');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let activeTextArea = null;

addEntryButton.addEventListener('click', () => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.placeholder = 'Data';
    
    const textArea = document.createElement('textarea');
    
    const micButton = document.createElement('button');
    micButton.textContent = '🎤';
    micButton.classList.add('mic-button');
    
    const stopButton = document.createElement('button');
    stopButton.textContent = '⏹️';
    stopButton.classList.add('stop-button');
    stopButton.style.display = 'none'; // Initially hidden
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';
    
    micButton.addEventListener('click', () => {
        if (recognition.recognizing) {
            recognition.stop();
            micButton.textContent = '🎤';
            stopButton.style.display = 'none';
        } else {
            activeTextArea = textArea;
            recognition.start();
            micButton.textContent = '⏹️';
            stopButton.style.display = 'inline';
        }
    });
    
    stopButton.addEventListener('click', () => {
        recognition.stop();
        micButton.textContent = '🎤';
        stopButton.style.display = 'none';
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
        stopButton.style.display = 'none';
    };
    
    entryDiv.appendChild(dateInput);
    entryDiv.appendChild(textArea);
    entryDiv.appendChild(micButton);
    entryDiv.appendChild(stopButton);
    entriesContainer.appendChild(entryDiv);
});

exportButton.addEventListener('click', () => {
    let entries = document.querySelectorAll('.entry');
    let textContent = '';
    
    entries.forEach(entry => {
        let date = entry.querySelector('input[type="date"]').value || 'Data não selecionada';
        let text = entry.querySelector('textarea').value;
        textContent += `Data: ${date}\nTexto: ${text}\n\n`;
    });

    let blob = new Blob([textContent], { type: 'text/plain' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'prontuarios.txt';
    a.click();
});
