document.addEventListener('DOMContentLoaded', () => {
    // Verifica se a API de reconhecimento de fala está disponível
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Reconhecimento de fala não é suportado neste navegador. Tente usar o Google Chrome.');
        return;
    }

    const recognition = new SpeechRecognition();
    const languageSelect = document.getElementById('language');
    const resultContainer = document.querySelector('.result p.resultText');
    const startListeningButton = document.querySelector('.btn.record');
    const recordButtonText = document.querySelector('.btn.record p');
    const clearButton = document.querySelector('.btn.clear');
    const downloadButton = document.querySelector('.btn.download');

    let recognizing = false; // Controla se está gravando
    let manualStop = false; // Variável para rastrear parada manual

    // Preenche as opções de idioma
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.text = language.name;
        languageSelect.add(option);
    });

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    languageSelect.addEventListener('change', () => {
        recognition.lang = languageSelect.value;
    });

    startListeningButton.addEventListener('click', toggleSpeechRecognition);

    clearButton.addEventListener('click', clearResults);

    downloadButton.disabled = true;

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        resultContainer.textContent = result;
        downloadButton.disabled = false;
    };

    recognition.onend = () => {
        if (recognizing && !manualStop) {
            recognition.start();
        } else {
            recognizing = false;
            startListeningButton.classList.remove('recording');
            recordButtonText.textContent = 'Comece a gravar';
        }
    };

    recognition.onerror = (event) => {
        console.error('Erro no reconhecimento de fala:', event.error);
        alert(`Erro: ${event.error}. Verifique as permissões ou tente novamente.`);
        recognizing = false;
        startListeningButton.classList.remove('recording');
        recordButtonText.textContent = 'Comece a gravar';
    };

    function toggleSpeechRecognition() {
        if (recognizing) {
            manualStop = true;
            recognition.stop();
            recognizing = false;
        } else {
            // Solicita permissão para usar o microfone no dispositivo móvel
            if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                alert('A aplicação precisa ser acessada via HTTPS para funcionar corretamente no navegador do celular.');
                return;
            }

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    manualStop = false;
                    recognition.start();
                    recognizing = true;
                    startListeningButton.classList.toggle('recording', recognizing);
                    recordButtonText.textContent = 'Pare de gravar';

                    // Para garantir que o microfone esteja funcionando
                    const audioTracks = stream.getAudioTracks();
                    if (audioTracks.length === 0) {
                        alert('Não foi possível acessar o microfone. Verifique as configurações do dispositivo.');
                    }
                })
                .catch(err => {
                    alert('Não foi possível acessar o microfone. Verifique as permissões no navegador.');
                    console.error('Erro ao acessar o microfone:', err);
                });
        }
    }

    function clearResults() {
        resultContainer.textContent = '';
        downloadButton.disabled = true;
    }

    function downloadResult() {
        const resultText = resultContainer.textContent;

        const blob = new Blob([resultText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'Your-Text.txt';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    downloadButton.addEventListener('click', downloadResult);
});
