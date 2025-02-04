document.addEventListener('DOMContentLoaded', () => {
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

    let recognizing = false;
    let manualStop = false;
    let fullText = '';

    console.log('Iniciando aplicação222...');

    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.text = language.name;
        languageSelect.add(option);
    });

    recognition.continuous = true; // Modo contínuo padrão
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    languageSelect.addEventListener('change', () => {
        recognition.lang = languageSelect.value;
        console.log('Idioma alterado para:', recognition.lang);
    });

    startListeningButton.addEventListener('click', toggleSpeechRecognition);

    clearButton.addEventListener('click', clearResults);

    downloadButton.disabled = true;

    recognition.onresult = (event) => {
        let interimText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                fullText += transcript + ' ';
            } else {
                interimText += transcript;
            }
        }
        resultContainer.textContent = fullText + interimText;
        console.log('Texto reconhecido:', fullText + interimText);
        downloadButton.disabled = false;
    };

    recognition.onend = () => {
        console.log('Reconhecimento de fala encerrado.');

        // Evitar loops infinitos em dispositivos móveis
        if (recognizing && !manualStop) {
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                console.warn('Detecção de dispositivo móvel: Não reiniciando automaticamente.');
                recognizing = false;
                startListeningButton.classList.remove('recording');
                recordButtonText.textContent = 'Comece a gravar';
                return;
            }

            console.log('Reiniciando reconhecimento de fala automaticamente...');
            try {
                recognition.start();
            } catch (error) {
                console.error('Erro ao reiniciar o reconhecimento:', error);
            }
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
            console.log('Gravação parada manualmente.');
        } else {
            console.log('Verificando suporte às APIs de mídia...');
            console.log('User Agent:', navigator.userAgent);
            console.log('navigator.mediaDevices:', !!navigator.mediaDevices);

            if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
                console.error('navigator.mediaDevices ou getUserMedia não disponíveis.');
                alert(
                    'O navegador não suporta ou bloqueou o acesso às APIs de mídia. ' +
                    'Certifique-se de usar HTTPS e um navegador atualizado (como Chrome ou Firefox).'
                );
                return;
            }

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    console.log('Permissão de microfone concedida:', stream);
                    manualStop = false;

                    try {
                        recognition.start();
                        recognizing = true;
                        startListeningButton.classList.add('recording');
                        recordButtonText.textContent = 'Pare de gravar';
                    } catch (error) {
                        console.error('Erro ao iniciar o reconhecimento:', error);
                        alert('Erro ao iniciar o reconhecimento de fala. Tente novamente.');
                    }
                })
                .catch(err => {
                    alert('Erro ao acessar o microfone. Verifique as permissões no navegador ou reinicie o dispositivo.');
                    console.error('Erro ao acessar o microfone:', err);
                });
        }
    }

    function clearResults() {
        fullText = '';
        resultContainer.textContent = '';
        downloadButton.disabled = true;
        console.log('Resultados limpos.');
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
        console.log('Resultado baixado.');
    }

    downloadButton.addEventListener('click', downloadResult);
});
